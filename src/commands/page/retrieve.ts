import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import {
  GetPageParameters,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isFullPage } from '@notionhq/client'
import { outputRawJson } from '../../helper'

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
    raw: Flags.boolean(),
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
        get: (row: GetPageResponse) => {
          if (isFullPage(row)) {
            let title: string
            Object.entries(row.properties).find(([_, prop]) => {
              if (prop.type === 'title') {
                title = prop.title[0] && prop.title[0].plain_text
              }
            })
            return title
          } else {
            return 'untitled'
          }
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
