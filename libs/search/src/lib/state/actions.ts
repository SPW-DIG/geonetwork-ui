import { RecordSummary, ResultsListLayout, SearchFilters } from '@lib/common'
import { Action } from '@ngrx/store'

export const UPDATE_FILTERS = '[Search] Update Filters'
export const SET_CURRENT = '[Search] Set current record'
export const SORT_BY = '[Search] Sort By'
export const UPDATE_RESULTS_LAYOUT = '[Search] Update results layout'
export const ADD_RESULTS = '[Search] Add Results'
export const CLEAR_RESULTS = '[Search] Clear Results'
export const REQUEST_MORE_RESULTS = '[Search] Request More Results'
export const SET_RESULTS_AGGREGATIONS = '[Search] Set Results Aggregations'
export const SET_CONFIG_AGGREGATIONS = '[Search] Set Config Aggregations'

export class UpdateFilters implements Action {
  readonly type = UPDATE_FILTERS

  constructor(public payload: SearchFilters) {}
}

export class SortBy implements Action {
  readonly type = SORT_BY

  constructor(public sortBy: string) {}
}

export class SetCurrent implements Action {
  readonly type = SET_CURRENT

  constructor(public record: RecordSummary) {}
}

export class UpdateResultsLayout implements Action {
  readonly type = UPDATE_RESULTS_LAYOUT

  constructor(public resultsLayout: ResultsListLayout) {}
}

export class AddResults implements Action {
  readonly type = ADD_RESULTS

  constructor(public payload: RecordSummary[]) {}
}

export class ClearResults implements Action {
  readonly type = CLEAR_RESULTS

  constructor() {}
}

export class RequestMoreResults implements Action {
  readonly type = REQUEST_MORE_RESULTS

  constructor() {}
}

export class SetResultsAggregations implements Action {
  readonly type = SET_RESULTS_AGGREGATIONS

  constructor(public payload: any) {}
}

export class SetConfigAggregations implements Action {
  readonly type = SET_CONFIG_AGGREGATIONS

  constructor(public payload: any) {}
}

export type SearchActions =
  | UpdateFilters
  | SetCurrent
  | SortBy
  | UpdateResultsLayout
  | AddResults
  | ClearResults
  | RequestMoreResults
  | SetResultsAggregations
  | SetConfigAggregations
