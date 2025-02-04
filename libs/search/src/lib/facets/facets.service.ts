import { Injectable } from '@angular/core'
import {
  AggregationsMatchPolicy,
  AggregationsTypesEnum,
  LogService,
  parse,
  PARSE_DELIMITER,
  SearchFilters,
} from '@lib/common'
import { FacetPath, ModelBlock, ModelItem } from '@lib/ui'

@Injectable({
  providedIn: 'root',
})
export class FacetsService {
  constructor(private logger: LogService) {}

  createFacetModel(
    requestAggregations,
    responseAggregations,
    isNested: boolean,
    path: string[] = [],
    matchPolicy: AggregationsMatchPolicy
  ) {
    if (requestAggregations === undefined) {
      return
    }
    const listModel = []

    interface AggEntry {
      key: string
      meta: object
      doc_count: number
    }

    for (const key in requestAggregations) {
      if (responseAggregations.hasOwnProperty(key)) {
        const requestAgg = requestAggregations[key]
        const responseAgg = responseAggregations[key]

        let blockModel: any = {
          key,
          items: [],
          matchPolicy,
          path: [...path, responseAgg.meta?.field || key],
          meta: responseAgg.meta,
        }
        if (requestAgg.hasOwnProperty(AggregationsTypesEnum.TERMS)) {
          blockModel = {
            ...blockModel,
            type: AggregationsTypesEnum.TERMS,
            size: requestAgg[AggregationsTypesEnum.TERMS].size,
            more: responseAgg.sum_other_doc_count > 0,
            includeFilter: requestAgg.terms.include !== undefined,
            excludeFilter: requestAgg.terms.exclude !== undefined,
          }

          responseAgg.buckets.forEach((bucket) => {
            if (bucket.key) {
              const value = bucket.key_as_string || bucket.key
              const itemPath = [...blockModel.path, String(value)]
              const itemModel = {
                value,
                meta: bucket.meta,
                count: bucket.doc_count,
                path: itemPath,
              }
              blockModel.items.push(itemModel)
            }
          })
        } else if (requestAgg.hasOwnProperty(AggregationsTypesEnum.HISTOGRAM)) {
          blockModel = {
            ...blockModel,
            type: AggregationsTypesEnum.HISTOGRAM,
            size: requestAgg[AggregationsTypesEnum.HISTOGRAM].size,
          }

          if (requestAgg[AggregationsTypesEnum.HISTOGRAM].keyed) {
            const entries = Object.entries(responseAgg.buckets)
            for (let p = 0; p < entries.length; p++) {
              const entry: [string, AggEntry] = entries[p] as [string, AggEntry]
              const nextEntry: [string, AggEntry] = entries[p + 1] as [
                string,
                AggEntry
              ]
              const lowerBound = entry[1].key
              const onlyOneBucket = entries.length === 1
              const upperBound = onlyOneBucket
                ? lowerBound +
                  Number(requestAgg[AggregationsTypesEnum.HISTOGRAM].interval)
                : nextEntry
                ? nextEntry[1].key
                : '*'
              const value = lowerBound + '-' + upperBound
              const itemPath = [...blockModel.path, lowerBound + '']
              const itemModel = {
                value,
                meta: entry[1].meta,
                count: entry[1].doc_count,
                query_string: `+${requestAgg.histogram.field}:[${lowerBound} TO ${upperBound}}`,
                path: itemPath,
              }
              blockModel.items.push(itemModel)
            }
          } else {
            this.logger.warn(
              'Facet configuration error. Histogram are only supported with keyed mode.' +
                'eg. creationYearForResource: {histogram: { ' +
                'field: "creationYearForResource",' +
                'interval: 5,' +
                'keyed: true,' +
                'min_doc_count: 1}}'
            )
          }
        } else if (requestAgg.hasOwnProperty(AggregationsTypesEnum.FILTERS)) {
          const type = AggregationsTypesEnum.FILTERS
          blockModel = {
            ...blockModel,
            type,
            size: requestAgg[type].size,
          }

          Object.entries(responseAgg.buckets).forEach((entry) => {
            const itemValue = entry[0]
            const bucket = entry[1] as AggEntry
            const itemPath = [...blockModel.path, itemValue]
            const itemModel = {
              value: itemValue,
              meta: bucket.meta,
              count: bucket.doc_count,
              path: itemPath,
              query_string:
                requestAgg.filters.filters[itemValue].query_string.query,
            }
            blockModel.items.push(itemModel)
          })
        } else {
          this.logger.warn('Unsupported aggregation config.', requestAgg)
        }
        listModel.push(blockModel)
      }
    }
    return listModel
  }

  /**
   * Compute the path value of a facet item. The path value is the last
   * element of the path array.
   * If the item is not selected, returns `null`
   * For 'terms' facet, it is a boolean, true when selected, false when
   * inverted.
   * For 'filters' and 'histogram', it is a lucene expression
   *
   * @param block model
   * @param item model
   */
  computeItemPathValue(block: ModelBlock, item: ModelItem) {
    const { selected, inverted } = item
    const { type } = block
    let value: any = !inverted

    if (selected) {
      if (
        type === AggregationsTypesEnum.FILTERS ||
        type === AggregationsTypesEnum.HISTOGRAM
      ) {
        value = item.query_string
        if (inverted) {
          value = `-(${value})`
        }
      }
    } else {
      value = null
    }
    return value
  }

  /**
   * Create a new filter object that will be passed to the state.
   * It update recursively the object depending on the path structure.
   *
   * @param filters previous state
   * @param path of the updated item
   * @param value of the updated item
   */
  computeNewFiltersFromState(
    filters: SearchFilters,
    path: FacetPath,
    value: any
  ): SearchFilters {
    const clone = JSON.parse(JSON.stringify(filters))
    const getter = parse(path.join(PARSE_DELIMITER))
    if (value === null) {
      this.removePathFromFilters(clone, path)
    } else {
      const setter = getter.assign
      setter(clone, value)
    }
    return clone
  }

  /**
   * Remove a filter in the state object, depending on the given path, which
   * could be deep in the parameter tree.
   *
   * @param filters state
   * @param path to remove from state
   */
  removePathFromFilters(filters: SearchFilters, path: FacetPath) {
    const head = path[0]
    const tail = path.slice(1)
    for (const prop of Object.keys(filters)) {
      if (filters.hasOwnProperty(prop)) {
        if (head.toString() === prop && tail.length === 0) {
          delete filters[prop]
        } else {
          if ('object' === typeof filters[prop]) {
            this.removePathFromFilters(filters[prop], tail)
            if (0 === Object.keys(filters[prop]).length) {
              delete filters[prop]
            }
          }
        }
      }
    }
  }

  /**
   * Compute filters recursive paths enabled in the state current
   * search
   * e.g [["tag.default", "land use"]]
   *
   * @param filters Search filters from state
   */
  findSelectedPaths(filters): string[][] {
    const discoveredObjects = [] // For checking for cyclic object
    const path = []
    const results = []

    // store void result to prevent ; added by prettier before iife
    const _ = (function find(obj) {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] !== 'object') {
          // Found a selected path
          path.push(key)
          results.push(Array.from(path))
          path.pop()
        }
        const o = obj[key] // The next object to be searched
        if (o && typeof o === 'object') {
          if (!discoveredObjects.find((discovered) => discovered === o)) {
            // check for cyclic link
            path.push(key)
            discoveredObjects.push(o)
            find(o)
            path.pop()
          }
        }
      }
    })(filters)

    return results
  }
}
