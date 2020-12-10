import { RecordSummary, ResultsListLayout, SearchFilters } from '@lib/common'
import * as fromActions from './actions'

export const SEARCH_FEATURE_KEY = 'searchState'

export interface SearchState {
  config: {
    aggregations?: any
  }
  params: {
    filters: SearchFilters
    sortBy?: string
    resultsLayout?: ResultsListLayout
    size?: number
  }
  results: {
    current: RecordSummary
    records: RecordSummary[]
    aggregations: any
  }
  loadingMore: boolean
}

export const initialState: SearchState = {
  config: {},
  params: {
    filters: {},
  },
  results: {
    current: null,
    records: [],
    aggregations: {},
  },
  loadingMore: false,
}

export function reducer(
  state = initialState,
  action: fromActions.SearchActions
): SearchState {
  switch (action.type) {
    case fromActions.UPDATE_FILTERS: {
      return {
        ...state,
        params: {
          ...state.params,
          filters: { ...action.payload },
        },
      }
    }
    case fromActions.SORT_BY: {
      return {
        ...state,
        params: {
          ...state.params,
          sortBy: action.sortBy,
        },
      }
    }
    case fromActions.SET_CURRENT: {
      return {
        ...state,
        results: {
          ...state.results,
          current: action.record,
        },
      }
    }
    case fromActions.UPDATE_RESULTS_LAYOUT: {
      return {
        ...state,
        params: {
          ...state.params,
          resultsLayout: action.resultsLayout,
        },
      }
    }
    case fromActions.ADD_RESULTS: {
      return {
        ...state,
        results: {
          ...state.results,
          records: [...state.results.records, ...action.payload],
        },
        loadingMore: false,
      }
    }
    case fromActions.CLEAR_RESULTS: {
      return {
        ...state,
        results: {
          ...state.results,
          records: [],
        },
      }
    }
    case fromActions.REQUEST_MORE_RESULTS: {
      return {
        ...state,
        loadingMore: true,
      }
    }
    case fromActions.SET_RESULTS_AGGREGATIONS: {
      return {
        ...state,
        results: {
          ...state.results,
          aggregations: action.payload,
        },
      }
    }
    case fromActions.SET_CONFIG_AGGREGATIONS: {
      return {
        ...state,
        config: {
          ...state.config,
          aggregations: action.payload,
        },
      }
    }
  }

  return state
}
