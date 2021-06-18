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

export enum AggregationsUpdatePolicy {
  // When a search is done, the facet component will update
  ALWAYS = 'ALWAYS',
  // Preserve facet from the first search only eg. a main menu switcher
  // It add search as filter (not query)
  ONFIRSTSEARCHONLY = 'ONFIRSTSEARCHONLY',
  // Update only on major search ie. when selecting from a ONFIRSTSEARCHONLY
  // or a full text filter
  ONMAJORSEARCH = 'ONMAJORSEARCH',
}

export enum FacetLayout {
  CHECKBOX = 'CHECKBOX',
  NUMBER = 'NUMBER',
  NUMBER_IN_COLUMN = 'NUMBER_IN_COLUMN',
  TAB = 'TAB',
  MENU = 'MENU',
}

export class FacetIconConfig {
  background: boolean
  items: any[]
}
