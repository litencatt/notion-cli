import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import {
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'

export default class PageUpdate extends Command {
  static description = 'Update a page'

  static examples = [
    '<%= config.bin %> <%= command.id %> <page_id>',
    '<%= config.bin %> <%= command.id %> <page_id> -a',
    '<%= config.bin %> <%= command.id %> <page_id> -u',
  ]

  static args = {
    page_id: Args.string({ required: true }),
  }

  // TODO: Add support icon, cover
  static flags = {
    archived: Flags.boolean({ char: 'a'}),
    un_archive: Flags.boolean({ char: 'u'}),
  }

  // TODO: Add support for updating a page property
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageUpdate)
    const pageProps: UpdatePageParameters = {
      page_id: args.page_id,
    }
    if (flags.archived) {
      pageProps.archived = true
    }
    if (flags.un_archive) {
      pageProps.archived = false
    }
    const res = await notion.updatePageProps(pageProps)
    console.dir(res, { depth: null })
  }
}
