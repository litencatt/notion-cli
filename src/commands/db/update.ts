import {Args, Command, Flags} from '@oclif/core'
import { isFullDatabase } from '@notionhq/client'
import {
  UpdateDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../notion'
import {
  onCancel,
  getDbChoices,
} from '../../helper'
const  prompts  = require('prompts')

export default class DbUpdate extends Command {
  static description = 'Update a database'

  static examples = [
    {
      description: 'Update a database via interactive mode',
      command: `$ notion-cli db update`,
    },
    {
      description: 'Update a database with a specific database_id',
      command: `$ notion-cli db update DATABASE_ID`,
    },
  ]

  static args = {
    databaseId: Args.string(),
  }

  static flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(DbUpdate)

    let databaseId = args.databaseId
    if (databaseId == undefined) {
      const dbChoices = await getDbChoices()
      const promptSelectedDbResult = await prompts([{
        type: 'autocomplete',
        name: 'database_id',
        message: 'Select a database to update',
        choices: dbChoices
      }], { onCancel })
      console.log(promptSelectedDbResult)

      databaseId = promptSelectedDbResult.database_id
    }

    // TODO: support other properties
    const dbPropPromptResult = await prompts([{
      type: 'text',
      name: 'title',
      message: 'Please input new database title',
    }], { onCancel })

    const dbProps: UpdateDatabaseParameters = {
      database_id: databaseId,
      title: [
        {
          type: 'text',
          text: {
            content: dbPropPromptResult.title,
          }
        }
      ]
    }
    const res = await notion.updateDb(dbProps)
    console.dir(res, { depth: null })
  }
}
