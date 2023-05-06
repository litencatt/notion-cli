import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class DbQuery extends Command {
  static description = 'Query a database'

  static examples = [
    `$ notion-cli db query f929e92f257c4d8bb9d0c176ce24814d`,
    `$ notion-cli db query f929e92f257c4d8bb9d0c176ce24814d -f "{\"property\":\"Number\",\"number\":{\"equals\":2}}"`,
  ]

  static args = {
    database_id: Args.string({required: true}),
  }

  static flags = {
    filter: Flags.string({ char: 'f', description: 'JSON stringified filter string' }),
  }

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(DbQuery)

    let filter: object | undefined
    try {
      filter = flags.filter ? JSON.parse(flags.filter) : undefined
    } catch(e) {
      console.log(e)
      filter = undefined
    }
    const res = await notion.queryDb(args.database_id, filter)
    console.dir(res, { depth: null })
  }
}
