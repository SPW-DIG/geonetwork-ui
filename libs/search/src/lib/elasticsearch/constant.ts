export enum ElasticsearchMetadataModels {
  SUMMARY,
  BRIEF,
  FULL,
}

export const ES_SOURCE_SUMMARY = [
  'uuid',
  'id',
  'resource*',
  'overview',
  'logo',
  'geom',
  'link',
  'format',
  'allKeywords',
  'codelist_status_text',
]

export const ES_SOURCE_BRIEF = [...ES_SOURCE_SUMMARY, 'Org']

export const ElasticSearchSources = {
  [ElasticsearchMetadataModels.SUMMARY]: ES_SOURCE_SUMMARY,
  [ElasticsearchMetadataModels.BRIEF]: ES_SOURCE_BRIEF,
}
