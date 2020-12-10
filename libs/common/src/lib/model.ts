import { Feature } from 'geojson'

export interface SearchFilters {
  any?: string
}

export interface RecordSummary {
  id: string
  uuid: string
  title: string
  abstract: string
  metadataUrl: string
  thumbnailUrl: string
  logoUrl?: string
  downloadable?: boolean
  viewable?: boolean
  updateFrequency?: string
  geom: Feature
  format: Array<string>
  allThesaurus: object
  link: Array<any>
}

export interface RecordBrief extends RecordSummary {
  organization: string
  type: string
}

export interface RecordMetric {
  value: string
  recordCount: number
}

export enum ResultsListLayout {
  CARD = 'CARD',
  LIST = 'LIST',
  TEXT = 'TEXT',
  TITLE = 'TITLE',
}

export const RESULTS_PAGE_SIZE = 12
