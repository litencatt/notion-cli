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
import { NotionToMarkdown } from "notion-to-md"

export default class PageRetrieve extends Command {
  static description = 'Retrieve a page'

  static aliases: string[] = ['page:r']

  static examples = [
    {
      description: 'Retrieve a page and output table',
      command: `$ notion-cli page retrieve PAGE_ID`,
    },
    {
      description: 'Retrieve a page and output raw json',
      command: `$ notion-cli page retrieve PAGE_ID -r`,
    },
    {
      description: 'Retrieve a page and output markdown',
      command: `$ notion-cli page retrieve PAGE_ID -m`,
    },
    {
      description: 'Retrieve a page with filter properties',
      command: `$ notion-cli page retrieve PAGE_ID -p title,Z%3ESr`,
    },
    {
      description: 'Retrieve a page with filter properties and output raw json',
      command: `$ notion-cli page retrieve PAGE_ID -p title,Z%3ESr -r`,
    },
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
    markdown: Flags.boolean({
      char: 'm',
      description: 'output markdown',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageRetrieve)

    if (flags.markdown) {
      const n2m = new NotionToMarkdown({ notionClient: notion.client })
      const mdBlocks = await n2m.pageToMarkdown(args.page_id)
      const mdString = n2m.toMarkdownString(mdBlocks)
      console.log(mdString.parent)
      this.exit(0)
    }

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
