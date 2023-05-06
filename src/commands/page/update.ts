import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class PageUpdate extends Command {
  static description = 'Update a page'

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
    const {args, flags} = await this.parse(PageUpdate)
    const res = await notion.updatePage(args.page_id, {})
    console.dir(res, { depth: null })
  }
}
