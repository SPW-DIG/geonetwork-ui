import { RecordBrief, RecordSummary } from '@lib/common'
import { SearchResponse } from 'elasticsearch'

export class ElasticsearchMapper {
  response: SearchResponse<any>

  constructor(response: SearchResponse<any>) {
    this.response = response
  }

  toRecordSummary(): RecordSummary[] {
    return this.response.hits.hits.map((hit) => ({
      uuid: hit._id,
      id: hit._source.id,
      title: hit._source.resourceTitleObject?.default || 'no title',
      abstract: hit._source.resourceAbstractObject?.default || 'no abstract',
      thumbnailUrl: this.getFirstValue(hit._source.overview)?.url || '',
      metadataUrl: `/geonetwork/srv/eng/catalog.search#/metadata/${hit._source.uuid}`,
      downloadable: (hit as any).download,
      viewable: (hit as any).view,
      logoUrl: `/geonetwork${hit._source.logo}`,
      updateFrequency: this.getFirstValue(hit._source.codelist_status_text),
      geom: hit._source.geom,
      allThesaurus: hit._source.allThesaurus,
      format: hit._source.format,
      link: hit._source.link,
    }))
  }

  toRecordBrief() {}

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
