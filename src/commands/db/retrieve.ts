import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class DbRetrieve extends Command {
  static description = 'Retrieve a database'

  static examples = [
    `$ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d`,
  ]

  static args = {
    databaseId: Args.string({required: true}),
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(DbRetrieve)
    const res = await notion.retrieveDb(args.databaseId)
    console.dir(res, { depth: null })
  }
}
