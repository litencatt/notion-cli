import {Args, Command, Flags} from '@oclif/core'
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
    databaseId: Args.string({required: true}),
  }

  static flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(DbUpdate)

    // TODO: support other properties
    const dbPropPromptResult = await prompts([{
      type: 'text',
      name: 'title',
      message: 'Please input new database title',
    }], { onCancel })

    const dbProps: UpdateDatabaseParameters = {
      database_id: args.databaseId,
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
