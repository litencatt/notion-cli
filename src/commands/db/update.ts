import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

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
    const res = await notion.updateDb(args.databaseId)
    console.dir(res, { depth: null })
  }
}
