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

export const getNotionDbOptions = async(
  selectedDb: GetDatabaseResponse
) => {
  const propChoices: PromptChoice[] = []
  Object.entries(selectedDb.properties).forEach(([_, prop]) => {
    const options = []
    switch (prop.type) {
      case 'select':
        for (const opt of prop.select.options) {
          options.push({
            id: opt.id,
            name: opt.name
          })
        }
        break
      case 'multi_select':
        for (const opt of prop.multi_select.options) {
          options.push({
            id: opt.id,
            name: opt.name
          })
        }
        break
      case 'relation':
        options.push({
          id: prop.relation.database_id,
          name: ""
        })
        break
    }
    propChoices.push({
      title: prop.name,
      value: prop.name,
      type: prop.type,
      options: options
    })
  })
  return propChoices
}

export const buildFilterPagePromptFromObj = async (
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
      if (prop.select.options == null) {
        console.log("selected column options is null")
        return
      }
      const multiSelectChoices = prop.select.options.map((o) => {
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

export const buildFilterPagePrompt = async (
  choice: PromptChoice
) => {
  switch (choice.type) {
    case 'number':
      return {
        type: 'number',
        name: 'value',
        message: 'input a number',
      }
    case 'select':
      if (choice.options == null) {
        console.log("selected column options is null")
        return
      }
      const selectChoices = choice.options.map((co) => {
        return {
          title: co.name,
          value: co.name
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
      if (choice.options == null) {
        console.log("selected column options is null")
        return
      }
      const multiSelectChoices = choice.options.map((co) => {
        return {
          title: co.name,
          value: co.name
        }
      })
      return {
        type: 'autocompleteMultiselect',
        name: 'value',
        message: 'select items',
        choices: multiSelectChoices
      }
    case 'relation':
      if (choice.options == null) {
        console.log("selected column options is null")
        return
      }
      const relationChoices = choice.options.map((co) => {
        return {
          title: co.name,
          value: co.id
        }
      })
      return {
        type: 'autocompleteMultiselect',
        name: 'value',
        message: 'select relation pages',
        choices: relationChoices
      }
    default:
      console.log(`${choice.type} is not supported`)
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
      filter = {
        property: name,
        [type]: {
          contains: value
        }
      }
      break
    case 'relation':
      filter = {
        property: name,
        [type]: {
          contains: value
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
