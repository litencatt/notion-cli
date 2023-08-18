import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import {
  GetPageParameters,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import {
  getPageTitle,
  outputRawJson
} from '../../helper'

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
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
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
    if (flags.raw) {
      outputRawJson(res)
      this.exit(0)
    }

    const columns = {
      title: {
        get: (row: PageObjectResponse) => {
          return getPageTitle(row)
        },
      },
      object: {},
      id: {},
      url: {},
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags
    }
    ux.table([res], columns, options)
  }
}
