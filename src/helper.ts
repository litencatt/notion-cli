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
          value: co.id
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

export const buildFilter = async (
  name: string,
  type: string,
  value: string
): Promise<string|null> =>  {
  switch (type) {
    case 'number':
      return JSON.stringify({
        and: [
          {
            property: name,
            [type]: {
              equals: value
            }
          }
        ]
      })
    case 'select':
      return JSON.stringify({
        and: [
          {
            property: name,
            [type]: {
              equals: value
            }
          }
        ]
      })
  }
  return null
}

export const buildUpdateData = async (
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
  }
  return null
}
