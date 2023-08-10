import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import {
  onCancel,
  getDbChoices,
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
      const dbChoices = await getDbChoices()
      const promptSelectedDbResult = await prompts([{
        type: 'autocomplete',
        name: 'database_id',
        message: 'Select a database',
        choices: dbChoices
      }], { onCancel })
      console.log(promptSelectedDbResult)

      databaseId = promptSelectedDbResult.database_id
    }
    const res = await notion.retrieveDb(databaseId)
    console.dir(res, { depth: null })
  }
}
