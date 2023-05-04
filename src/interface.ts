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

export interface PromptItem {
  title: string
  value: string
  type: string
}
