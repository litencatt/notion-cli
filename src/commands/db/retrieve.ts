import {Args, Command, Flags} from '@oclif/core'
import { isFullDatabase } from '@notionhq/client'
import * as notion from '../../notion'
import {
  onCancel,
} from '../../helper'
const  prompts  = require('prompts')

export default class DbRetrieve extends Command {
  static description = 'Retrieve a database'

  static examples = [
    `$ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d`,
  ]

  static args = {
    databaseId: Args.string(),
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(DbRetrieve)

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
        message: 'Select a database',
        choices: sortedDbChoices
      }], { onCancel })
      console.log(promptSelectedDbResult)

      databaseId = promptSelectedDbResult.database_id
    }
    const res = await notion.retrieveDb(databaseId)
    console.dir(res, { depth: null })
  }
}
