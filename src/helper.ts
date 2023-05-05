import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { PromptChoice } from './interface'


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
  }
  return null
}
