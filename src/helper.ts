import { PromptChoice } from './interface'

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

      const mSchoices = choice.options.map((co) => {
        return {
          title: co.name,
          value: co.name
        }
      })
      return {
        type: 'autocompleteMultiselect',
        name: 'value',
        message: 'select items',
        choices: mSchoices
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
  switch (type) {
    case 'number':
      return {
        property: name,
        [type]: {
          equals: value
        }
      }
    case 'select':
      return {
        property: name,
        [type]: {
          equals: value
        }
      }
    case 'multi_select':
      return {
        property: name,
        [type]: {
          contains: value
        }
      }
  }
  return null
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
