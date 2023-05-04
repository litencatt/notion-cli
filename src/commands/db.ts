import { Command, Flags } from '@oclif/core'
const  prompts  = require('prompts')
import { queryDb, createDb, updateDb, retrieveDb, searchDb } from '../notion'
import { PromptItem } from '../interface'

export default class Db extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    database_id: Flags.string({ char: 'd' }),

    query: Flags.boolean({ char: 'q', dependsOn: ['database_id'] }),
    filter: Flags.string({ char: 'f' }),

    create: Flags.boolean({ char: 'c', dependsOn: ['page_id'] }),
    page_id: Flags.string(),

    update: Flags.boolean({ char: 'u', dependsOn: ['database_id'] }),

    retrieve: Flags.boolean({ char: 'r', dependsOn: ['database_id'] }),
    propertyList: Flags.string({ char: 'p' }),
    onlyValue: Flags.boolean({ char: 'P' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Db)

    // Query a database
    if (flags.database_id && flags.query) {
      const res = await queryDb(flags.database_id, flags.filter as string)
      console.dir(res, { depth: null })
    }
    // Create a database
    if (flags.create && flags.page_id) {
      const res = await createDb(flags.page_id)
      console.dir(res, { depth: null })
    }
    // Update a database
    if (flags.database_id && flags.update) {
      // const res = await updateDb(flags.database_id)
      // console.dir(res, { depth: null })
    }
    // Retrieve a database
    if (flags.database_id && flags.retrieve) {
      const options = {
        propertyList: flags.propertyList,
        onlyValue: flags.onlyValue,
      }
      const res = await retrieveDb(flags.database_id, options)
      console.dir(res, { depth: null })
    }
    // Run prompt when no flags
    if (Object.keys(flags).length === 0) {
      // Search DB
      const dbs = await searchDb()
      const dbObj: PromptItem[] = []
      for (const db of dbs) {
        // @ts-ignore
        if (db.title[0] == null) {
          continue
        }
        dbObj.push({
          // @ts-ignore
          title: db.title[0].plain_text,
          value: db.id,
          type: "database"
        })
      }
      const databaseChoices = dbObj.sort((a,b)=> {
        return a.title.localeCompare(b.title)
      })
      const database = await prompts([
        {
          type: 'autocomplete',
          name: 'database',
          message: 'Select a database',
          choices: databaseChoices
        },
      ])
      this.log(database.database)

      // Search properties of DB
      const propObj: PromptItem[] = []
      const db = await retrieveDb(database.database, {})
      Object.entries(db.properties).forEach(([_, prop]) => {
        propObj.push({
          title: prop.name,
          value: prop.name,
          type: prop.type
        })
      })
      const propChoices = propObj.sort((a,b)=> {
        return a.title.localeCompare(b.title)
      })
      const choicedProp = await prompts([
        {
          type: 'autocomplete',
          name: 'property',
          message: 'select a property',
          choices: propChoices
        },
        {
          type: 'number',
          name: 'value',
          message: 'input a number',
        }
      ])
      this.log(choicedProp)
      const choicedPropType = propChoices.find((a) => {
        return a.value == choicedProp.property
      })?.type

      if (choicedPropType == undefined) {
        this.log(`${choicedPropType} is not found`)
        return
      }

      // Build Filter and Filtering
      // propがnumberの場合
      const pages = await queryDb(database.database, JSON.stringify({
        and: [
          {
            property: choicedProp.property,
            [choicedPropType]: {
              equals: choicedProp.value
            }
          }
        ]
      }))
      for (const page of pages) {
        console.log(page)
      }
      // Show page IDs
      // Select a update column
      // Set a value for update column
      // Update
    }
  }
}
