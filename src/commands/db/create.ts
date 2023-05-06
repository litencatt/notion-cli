import {Args, Command} from '@oclif/core'
import * as notion from '../../notion'

export default class DbCreate extends Command {
  static description = 'Create a database'

  static examples = [
    `$ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d`,
  ]

  static args = {
    page_id: Args.string({required: true}),
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(DbCreate)
    const res = await notion.createDb(args.page_id)
    console.dir(res, { depth: null })
  }
}
