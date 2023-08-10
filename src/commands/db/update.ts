import {Args, Command, Flags} from '@oclif/core'
import { isFullDatabase } from '@notionhq/client'
import {
  UpdateDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../notion'
import {
  onCancel,
} from '../../helper'
const  prompts  = require('prompts')

export default class DbUpdate extends Command {
  static description = 'Update a database'

  static examples = [
    `$ notion-cli db update f929e92f257c4d8bb9d0c176ce24814d`,
  ]

  static args = {
    databaseId: Args.string(),
  }

  static flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(DbUpdate)

    let databaseId = args.databaseId
    if (databaseId == undefined) {
      const dbs = await notion.searchDb()
      const dbChoices = []
      for (const db of dbs) {
        if (db.object != "database") {
          continue
        }
        if (!isFullDatabase(db)) {
          continue
        }
        if (db.title[0] == null) {
          continue
        }
        dbChoices.push({
          title: db.title[0].plain_text,
          value: db.id,
        })
      }
      const sortedDbChoices = dbChoices.sort((a,b)=> {
        return a.title.localeCompare(b.title)
      })

      const promptSelectedDbResult = await prompts([{
        type: 'autocomplete',
        name: 'database_id',
        message: 'Select a database to update',
        choices: sortedDbChoices
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
