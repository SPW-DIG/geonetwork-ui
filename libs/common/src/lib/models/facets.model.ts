export enum AggregationsTypesEnum {
  TERMS = 'terms',
  HISTOGRAM = 'histogram',
  FILTERS = 'filters',
  DATE_HISTOGRAM = 'date_histogram',
}

export enum AggregationsMatchPolicy {
  MATCH_ALL = 'MATCH_ALL',
  MATCH_ANY = 'MATCH_ANY',
  MATCH_ONE = 'MATCH_ONE',
}
