import {Args, Command} from '@oclif/core'
import * as notion from '../../notion'

export default class PageArchive extends Command {
  static description = 'Archive a page'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    page_id: Args.string({ required: true }),
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(PageArchive)
    const res = await notion.archivePage(args.page_id)
    console.dir(res, { depth: null })
  }
}
