import { Args, Command, Flags, ux } from '@oclif/core'
import {
  CreateDatabaseParameters,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../notion'
import { onCancel, outputRawJson, getDbTitle } from '../../helper'

const prompts = require('prompts')

export default class DbCreate extends Command {
  static description = 'Create a database'

  static aliases: string[] = ['db:c']

  static examples = [
    {
      description: 'Create a database via interactive mode',
      command: `$ notion-cli db create`,
    },
    {
      description: 'Create a database with a specific page_id',
      command: `$ notion-cli db create PAGE_ID`,
    },
    {
      description: 'Create a database with a specific page_id and title',
      command: `$ notion-cli db create PAGE_ID -t 'My Database'`,
    },
    {
      description: 'Create a database with a specific page_id and output raw json',
      command: `$ notion-cli db create PAGE_ID -r`,
    },
    {
      description: 'Create a database with a specific page_id and output raw json with title',
      command: `$ notion-cli db create PAGE_ID -t 'My Database' -r`,
    },
  ]

  static args = {
    page_id: Args.string({ required: true }),
  }

  static flags = {
    title: Flags.string({
      char: 't',
      description: 'new database title',
    }),
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DbCreate)
    console.log(`Creating a database in page ${args.page_id}`)

    let dbTitle = flags.title
    if (dbTitle == undefined) {
      const dbPropPromptResult = await prompts(
        [
          {
            type: 'text',
            name: 'title',
            message: 'Please input database title',
          },
        ],
        { onCancel }
      )
      console.log(dbPropPromptResult)

      dbTitle = dbPropPromptResult.title
    }

    // TODO: support other properties
    const dbProps: CreateDatabaseParameters = {
      parent: {
        type: 'page_id',
        page_id: args.page_id,
      },
      title: [
        {
          type: 'text',
          text: {
            content: dbTitle,
          },
        },
      ],
      properties: {
        Name: {
          title: {},
        },
      },
    }

    const res = await notion.createDb(dbProps)
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
