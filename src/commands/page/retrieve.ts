import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class PageRetrieve extends Command {
  static description = 'Retrieve a page'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    file_path: Flags.string({ char: 'f' }),
  }

  static args = {
    page_id: Args.string({ required: true }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageRetrieve)
    const res = await notion.retrievePage(args.page_id)
    console.dir(res, { depth: null })
  }
}
