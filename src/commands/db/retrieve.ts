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

  static flags = {
    propertyList: Flags.string({ char: 'p' }),
    onlyValue: Flags.boolean({ char: 'P' }),
  }

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(DbRetrieve)
    const options = {
      propertyList: flags.propertyList,
      onlyValue: flags.onlyValue,
    }
    const res = await notion.retrieveDb(args.databaseId, options)
    console.dir(res, { depth: null })
  }
}
