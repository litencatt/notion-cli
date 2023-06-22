import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetDatabaseResponse,
  CreateDatabaseResponse,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { IPromptChoice } from './interface'
import * as notion from './notion'
import { isFullPage } from '@notionhq/client'

export const SupportTypes = [
  'number',
  'select',
  'multi_select',
  'relation'
]

export const onCancel = () => {
  console.log('prompt is canceled');
  process.exit(0)
}

export const getFilterFields = async (
  type: string
) => {
  switch (type) {
    case 'number':
      return [
        { title: 'equals' },
        { title: 'does_not_equal' },
        { title: 'greater_than' },
        { title: 'greater_than_or_equal_to' },
        { title: 'less_than' },
        { title: 'less_than_or_equal_to' },
        { title: 'is_empty' },
        { title: 'is_not_empty' },
      ]
    case 'select':
      return [
        { title: 'equals' },
        { title: 'does_not_equal' },
        { title: 'is_empty' },
        { title: 'is_not_empty' },
      ]
    case 'multi_select':
    case 'relation':
      return [
        { title: 'contains' },
        { title: 'does_not_contain' },
        { title: 'is_empty' },
        { title: 'is_not_empty' },
      ]
    default:
      console.log(`${type} is not support type`)
      return null
  }
}

export const getPromptChoices = async (
  selectedDb: GetDatabaseResponse
): Promise<IPromptChoice[]> => {
  const propChoices: IPromptChoice[] = []
  Object.entries(selectedDb.properties).forEach(([_, prop]) => {
    // Skip not support property
    if (!SupportTypes.includes(prop.type)) {
      return
    }

    propChoices.push({
      title: `${prop.name} <${prop.type}>`,
    })
  })
  return propChoices
}

export const buildFilterPagePrompt = async (
  prop: any // DatabasePropertyConfigResponse
) => {
  switch (prop.type) {
    case 'number':
      return {
        type: 'number',
        name: 'value',
        message: 'input a number',
      }
    case 'select':
      const selectChoices = prop.select.options.map(o => {
        return {
          title: o.name,
        }
      })
      return {
        type: 'autocomplete',
        name: 'value',
        message: 'select an item',
        choices: selectChoices
      }
      break
    case 'multi_select':
      if (prop.multi_select.options == null) {
        console.log("selected column options is null")
        return
      }
      const multiSelectChoices = prop.multi_select.options.map((o) => {
        return {
          title: o.name,
          value: o.name
        }
      })
      return {
        type: 'autocompleteMultiselect',
        name: 'value',
        message: 'select items',
        choices: multiSelectChoices
      }
    case 'relation':
      const relationPages = await notion.queryDb(prop.relation.database_id)
      // console.log(relationPages)
      const relationChoices: IPromptChoice[] = []
      for (const page of relationPages) {
        if (page.object != "page") {
          continue
        }
        if (!isFullPage(page)) {
          continue
        }
        Object.entries(page.properties).forEach(([_, prop]) => {
          if (prop.type == "title") {
            relationChoices.push({
              title: prop.title[0].plain_text,
              value: page.id
            })
            return
          }
        })
      }
      return {
        type: 'autocompleteMultiselect',
        name: 'value',
        message: 'select relation pages',
        choices: relationChoices
      }
    default:
      console.log(`${prop.type} is not supported`)
  }
}

export const buildDatabaseQueryFilter = async (
  name: string,
  type: string,
  field: string,
  value: string | string[] | boolean
): Promise<object|null> =>  {
  let filter
  switch (type) {
    case 'number':
    case 'select':
      filter = {
        property: name,
        [type]: {
          [field]: value
        }
      }
      break
    case 'multi_select':
    case 'relation':
      const values = value as string[]
      if (values.length == 1) {
        filter = {
          property: name,
          [type]: {
            [field]: value[0]
          }
        }
      } else {
        filter = { and: [] }
        for (const v of values) {
          filter.and.push({
            property: name,
            [type]: {
              [field]: v
            }
          })
        }
      }
      break
    default:
      filter = null
  }
  // console.log(filter)
  return filter
}

export const buildPagePropUpdateData = async (
  name: string,
  type: string,
  value: string
): Promise<object|null> =>  {
  switch (type) {
    case 'number':
      return {
        [name]: {
          [type]: value
        }
      }
    case 'select':
      return {
        [name]: {
          [type]: {
            name: value
          }
        }
      }
    case 'multi_select':
      const nameObjects = []
      for (const val of value) {
        nameObjects.push({
          name: val
        })
      }
      return {
        [name]: {
          [type]: nameObjects
        }
      }
    case 'relation':
      const relationPageIds = []
      for (const id of value) {
        relationPageIds.push({ id: id })
      }
      return {
        [name]: {
          [type]: relationPageIds
        }
      }
  }
  return null
}

export const buildOneDepthJson = async (
  pages: QueryDatabaseResponse['results']
) => {
  const oneDepthJson = []
  for (const page of pages) {
    if (page.object != "page") {
      continue
    }
    if (!isFullPage(page)) {
      continue
    }
    const pageData = {}
    pageData["page_id"] = page.id
    Object.entries(page.properties).forEach(([key, prop]) => {
      switch(prop.type) {
        case "number":
          pageData[key] = prop.number
          break
        case "select":
          pageData[key] = prop.select === null ? "" : prop.select.name
          break
        case "multi_select":
          const multiSelects = []
          for (const select of prop.multi_select) {
            multiSelects.push(select.name)
          }
          pageData[key] = multiSelects.join(",")
          break
        case "relation":
          const relationPages = []
          for (const relation of prop.relation) {
            relationPages.push(relation.id)
          }
          pageData[key] = relationPages.join(",")
          break
        case "created_time":
          pageData[key] = prop.created_time
          break
        case "last_edited_time":
          pageData[key] = prop.last_edited_time
          break
        case "formula":
          switch (prop.formula.type) {
            case "string":
              pageData[key] = prop.formula.string
              break
            case "number":
              pageData[key] = prop.formula.number
              break
            case "boolean":
              pageData[key] = prop.formula.boolean
              break
            case "date":
              pageData[key] = prop.formula.date.start
              break
            default:
              // console.log(`${prop.formula.type} is not supported`)
          }
          break
        case "url":
          pageData[key] = prop.url
          break
        case "date":
          pageData[key] = prop.date === null ? "" : prop.date.start
          break
        case "email":
          pageData[key] = prop.email
          break
        case "phone_number":
          pageData[key] = prop.phone_number
          break
        case "created_by":
          pageData[key] = prop.created_by.id
          break
        case "last_edited_by":
          pageData[key] = prop.last_edited_by.id
          break
        case "people":
          const people = []
          for (const person of prop.people) {
            people.push(person.id)
          }
          pageData[key] = people.join(",")
          break
        case "files":
          const files = []
          for (const file of prop.files) {
            files.push(file.name)
          }
          pageData[key] = files.join(",")
          break
        case "checkbox":
          pageData[key] = prop.checkbox
          break
        // @ts-ignore
        case "unique_id":
          // @ts-ignore
          pageData[key] = `{prop.unique_id.prefix}-${prop.unique_id.number}`
          break
        case "title":
          pageData[key] = prop.title[0].plain_text
          break
        case "rich_text":
          const richTexts = []
          for (const richText of prop.rich_text) {
            richTexts.push(richText.plain_text)
          }
          pageData[key] = richTexts.join(",")
          break
        default:
          console.log(`${prop.type} is not supported`)
      }
    })
    oneDepthJson.push(pageData)
  }
  return oneDepthJson
}
