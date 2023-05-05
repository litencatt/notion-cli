import {
    GetDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { PromptChoice, IPromptChoice } from './interface'
import { promises } from 'dns'
import * as notion from './notion'
import { isFullPage } from '@notionhq/client'


export const getPromptChoices = async (
  selectedDb: GetDatabaseResponse
): Promise<IPromptChoice[]> => {
  const propChoices: IPromptChoice[] = []
  Object.entries(selectedDb.properties).forEach(([_, prop]) => {
    propChoices.push({
      title: prop.name,
      value: prop.name,
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
          value: o.name
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
      const relationPages = await notion.queryDb(prop.relation.database_id, "")
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
  value: string
): Promise<object|null> =>  {
  let filter
  switch (type) {
    case 'number':
      filter = {
        property: name,
        [type]: {
          equals: value
        }
      }
      break
    case 'select':
      filter = {
        property: name,
        [type]: {
          equals: value
        }
      }
      break
    case 'multi_select':
    case 'relation':
      if (typeof value == "string") {
        filter = {
          property: name,
          [type]: {
            contains: value
          }
        }
      } else {
        filter = { and: [] }
        for (const v of value) {
          filter.and.push({
            property: name,
            [type]: {
              contains: v
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
