import { Args, Command, Flags, ux } from '@oclif/core'
import * as notion from '../../notion'
import { UpdatePageParameters, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getPageTitle, outputRawJson } from '../../helper'

export default class PageUpdate extends Command {
  static description = 'Update a page'

  static aliases: string[] = ['page:u']

  static examples = [
    {
      description: 'Update a page and output table',
      command: `$ notion-cli page update PAGE_ID`,
    },
    {
      description: 'Update a page and output raw json',
      command: `$ notion-cli page update PAGE_ID -r`,
    },
    {
      description: 'Update a page and archive',
      command: `$ notion-cli page update PAGE_ID -a`,
    },
    {
      description: 'Update a page and un archive',
      command: `$ notion-cli page update PAGE_ID -u`,
    },
    {
      description: 'Update a page and archive and output raw json',
      command: `$ notion-cli page update PAGE_ID -a -r`,
    },
    {
      description: 'Update a page and un archive and output raw json',
      command: `$ notion-cli page update PAGE_ID -u -r`,
    },
  ]

  static args = {
    page_id: Args.string({ required: true }),
  }

  static flags = {
    archived: Flags.boolean({ char: 'a' }),
    un_archive: Flags.boolean({ char: 'u' }),
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  // NOTE: Support only archived or un archive property for now
  // TODO: Add support for updating a page properties, icon, cover
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(PageUpdate)
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
      ...flags,
    }
    ux.table([res], columns, options)
  }
}
