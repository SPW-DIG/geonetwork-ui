import { Injectable } from '@angular/core'
import { MetadataUrlService, RecordSummary } from '@lib/common'
import { SearchResponse } from 'elasticsearch'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(private metadataUrlService: MetadataUrlService) {}

  toRecordSummaries(response: any, apiPath?: string): RecordSummary[] {
    return response.hits.hits.map((hit) => this.toRecordSummary(hit, apiPath))
  }

  toRecordSummary(hit: any, apiPath?: string) {
    const overview = this.getFirstValue(hit._source.overview)
    const thumbnailUrl = overview?.data || overview?.url || ''
    const metadataUrl = this.metadataUrlService.getUrl(
      hit._source.uuid,
      apiPath
    )
    return {
      uuid: hit._id,
      id: hit._source.id,
      title: hit._source.resourceTitleObject?.default || 'no title',
      abstract: hit._source.resourceAbstractObject?.default || 'no abstract',
      thumbnailUrl,
      metadataUrl,
      downloadable: (hit as any).download,
      viewable: (hit as any).view,
      logoUrl: `/geonetwork${hit._source.logo}`,
      updateFrequency: this.getFirstValue(hit._source.codelist_status_text),
      geom: hit._source.geom,
      allThesaurus: hit._source.allThesaurus,
      format: hit._source.format,
      link: hit._source.link,
    }
  }

  toRecordBrief() {}

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
