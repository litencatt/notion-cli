import { Args, Command, Flags, ux } from '@oclif/core'
import {
  UpdateDatabaseParameters,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isFullDatabase } from '@notionhq/client'
import * as notion from '../../notion'
import { onCancel, getDbChoices, outputRawJson, getDbTitle } from '../../helper'

const prompts = require('prompts')

export default class DbUpdate extends Command {
  static description = 'Update a database'

  static aliases: string[] = ['db:u']

  static examples = [
    {
      description: 'Update a database via interactive mode',
      command: `$ notion-cli db update`,
    },
    {
      description: 'Update a database with a specific database_id',
      command: `$ notion-cli db update DATABASE_ID`,
    },
    {
      description: 'Update a database with a specific database_id and title',
      command: `$ notion-cli db update DATABASE_ID -t 'My Database'`,
    },
    {
      description: 'Update a database with a specific database_id and output raw json',
      command: `$ notion-cli db update DATABASE_ID -r`,
    },
  ]

  static args = {
    database_id: Args.string(),
  }

  static flags = {
    title: Flags.string({
      char: 't',
      description: 'New database title',
    }),
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DbUpdate)

    let databaseId = args.database_id
    if (databaseId == undefined) {
      const dbChoices = await getDbChoices()
      const promptSelectedDbResult = await prompts(
        [
          {
            type: 'autocomplete',
            name: 'database_id',
            message: 'Select a database to update',
            choices: dbChoices,
          },
        ],
        { onCancel }
      )
      console.log(promptSelectedDbResult)
      databaseId = promptSelectedDbResult.database_id
    }

    let dbTitle = flags.title
    if (dbTitle == undefined) {
      const dbPropPromptResult = await prompts(
        [
          {
            type: 'text',
            name: 'title',
            message: 'Please input new database title',
          },
        ],
        { onCancel }
      )
      dbTitle = dbPropPromptResult.title
    }

    // TODO: support other properties
    const dbProps: UpdateDatabaseParameters = {
      database_id: databaseId,
      title: [
        {
          type: 'text',
          text: {
            content: dbTitle,
          },
        },
      ],
    }

    const res = await notion.updateDb(dbProps)

    if (flags.raw) {
      outputRawJson(res)
      this.exit(0)
    }

    const columns = {
      title: {
        get: (row: DatabaseObjectResponse) => {
          return getDbTitle(row)
        },
      },
      object: {},
      id: {},
      url: {},
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags,
    }
    ux.table([res], columns, options)
  }
}
