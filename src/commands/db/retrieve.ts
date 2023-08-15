import {Args, Command, Flags, ux} from '@oclif/core'
import {
  GetDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isFullDatabase } from '@notionhq/client';
import * as notion from '../../notion'
import {
  onCancel,
  getDbChoices,
  outputRawJson,
} from '../../helper'

const  prompts  = require('prompts')

export default class DbRetrieve extends Command {
  static description = 'Retrieve a database'

  static aliases: string[] = ['db:r']

  static examples = [
    {
      description: 'Retrieve a database via interactive mode',
      command: 'notion-cli db retrieve',
    },
    {
      description: 'Retrieve a database via database_id',
      command: 'notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d',
    }
  ]

  static args = {
    database_id: Args.string(),
  }

  static flags = {
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DbRetrieve)

    let databaseId = args.database_id
    if (databaseId == undefined) {
      const dbChoices = await getDbChoices()
      const promptSelectedDbResult = await prompts([{
        type: 'autocomplete',
        name: 'database_id',
        message: 'Select a database',
        choices: dbChoices
      }], { onCancel })
      if (process.env.DEBUG) {
        console.log(promptSelectedDbResult)
      }

      databaseId = promptSelectedDbResult.database_id
    }

    const res = await notion.retrieveDb(databaseId)
    if (flags.raw) {
      outputRawJson(res)
      this.exit(0)
    }

    const columns = {
      title: {
        get: (row: GetDatabaseResponse) => {
          if (isFullDatabase(row)) {
            return row.title && row.title[0].plain_text
          }
        },
      },
      object: {},
      id: {},
      url: {},
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags
    }
    ux.table([res], columns, options)
  }
}
