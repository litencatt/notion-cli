import {
  GetDatabaseResponse,
  PartialDatabaseObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

export interface Setting {
  name: string
  enable: boolean
  pDbId: string
  cDbId: string
  relationKeys: string
  updateProp: string
}

export interface ParentPage {
  page_id: string
  relation_keys: RelationKey[]
}

export interface PropetyTypeInfo {
  property: string
  type: string
  value?: string
}

export interface RelationKey {
  property: string
  value: string
}

export interface PromptChoice {
  title: string
  value: string
  type: string
  options: {
    id: string
    name: string
  }[] | null
}

export interface IPromptChoice {
  title: string
  value?: string
}
