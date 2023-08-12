import {Args, Command} from '@oclif/core'
import {
  CreateDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../notion'
import {
  onCancel,
} from '../../helper'
const  prompts  = require('prompts')

export default class DbCreate extends Command {
  static description = 'Create a database'

  static examples = [
    {
      description: 'Create a database via interactive mode',
      command: `$ notion-cli db create`,
    },
    {
      description: 'Create a database with a specific page_id',
      command: `$ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d`,
    },
  ]

  static args = {
    page_id: Args.string({required: true}),
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(DbCreate)

    // TODO: support other properties
    const dbPropPromptResult = await prompts([{
      type: 'text',
      name: 'title',
      message: 'Please input database title',
    }], { onCancel })

    const dbProps: CreateDatabaseParameters = {
      parent: {
        type: 'page_id',
        page_id: args.page_id,
      },
      title: [
        {
          type: 'text',
          text: {
            content: dbPropPromptResult.title,
          }
        }
      ],
      properties: {
        Name: {
          title: {}
        }
      },
    }

    const res = await notion.createDb(dbProps)
    console.dir(res, { depth: null })
  }
}
