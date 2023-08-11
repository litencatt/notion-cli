import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import {
  GetPageParameters,
} from '@notionhq/client/build/src/api-endpoints'

export default class PageRetrieve extends Command {
  static description = 'Retrieve a page'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> -p title',
  ]

  static args = {
    pageId: Args.string({ required: true }),
    filterProperties: Args.string(),
  }

  static flags = {
    filterProperties: Flags.string({
      char: 'p',
      description: 'Comma separated property id string'
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageRetrieve)
    const pageProps: GetPageParameters = {
      page_id: args.pageId,
      filter_properties: flags.filterProperties.split(','),
    }
    const res = await notion.retrievePage(pageProps)
    console.dir(res, { depth: null })
  }
}
