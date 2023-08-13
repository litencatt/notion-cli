import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import {
  GetPageParameters,
} from '@notionhq/client/build/src/api-endpoints'

export default class PageRetrieve extends Command {
  static description = 'Retrieve a page'

  static aliases: string[] = ['page:r']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> -p title,Z%3ESr',
  ]

  static args = {
    page_id: Args.string({ required: true }),
  }

  static flags = {
    filter_properties: Flags.string({
      char: 'p',
      description: 'Comma separated property id string'
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageRetrieve)
    const pageProps: GetPageParameters = {
      page_id: args.page_id,
    }
    if (flags.filter_properties) {
      pageProps.filter_properties = flags.filter_properties.split(',')
    }
    const res = await notion.retrievePage(pageProps)
    console.dir(res, { depth: null })
  }
}
