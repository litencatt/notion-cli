import { Command, Flags, ux } from '@oclif/core'
import * as notion from '../notion'
import {
  PageObjectResponse,
  SearchParameters,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isFullDatabase, isFullPage } from '@notionhq/client'
import { getDbTitle, getPageTitle, outputRawJson } from '../helper'

export default class Search extends Command {
  static description = 'Search by title'

  static examples = [
    {
      description: 'Search by title',
      command: `$ notion-cli search -q 'My Page'`,
    },
    {
      description: 'Search by title and output csv',
      command: `$ notion-cli search -q 'My Page' --csv`,
    },
    {
      description: 'Search by title and output raw json',
      command: `$ notion-cli search -q 'My Page' -r`,
    },
    {
      description: 'Search by title and output table with specific columns',
      command: `$ notion-cli search -q 'My Page' --columns=title,object`,
    },
    {
      description: 'Search by title and output table with specific columns and sort direction',
      command: `$ notion-cli search -q 'My Page' --columns=title,object -d asc`,
    },
    {
      description:
        'Search by title and output table with specific columns and sort direction and page size',
      command: `$ notion-cli search -q 'My Page' -columns=title,object -d asc -s 10`,
    },
    {
      description:
        'Search by title and output table with specific columns and sort direction and page size and start cursor',
      command: `$ notion-cli search -q 'My Page' --columns=title,object -d asc -s 10 -c START_CURSOR_ID`,
    },
    {
      description:
        'Search by title and output table with specific columns and sort direction and page size and start cursor and property',
      command: `$ notion-cli search -q 'My Page' --columns=title,object -d asc -s 10 -c START_CURSOR_ID -p page`,
    },
  ]

  static flags = {
    query: Flags.string({
      char: 'q',
      description: 'The text that the API compares page and database titles against',
    }),
    sort_direction: Flags.string({
      char: 'd',
      options: ['asc', 'desc'],
      description:
        'The direction to sort results. The only supported timestamp value is "last_edited_time"',
      default: 'desc',
    }),
    property: Flags.string({
      char: 'p',
      options: ['database', 'page'],
    }),
    start_cursor: Flags.string({
      char: 'c',
    }),
    page_size: Flags.integer({
      char: 's',
      description:
        'The number of results to return. The default is 5, with a minimum of 1 and a maximum of 100.',
      min: 1,
      max: 100,
      default: 5,
    }),
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Search)
    const params: SearchParameters = {}
    if (flags.query) {
      params.query = flags.query
    }
    if (flags.sort_direction) {
      let direction: 'ascending' | 'descending'
      if (flags.sort_direction == 'asc') {
        direction = 'ascending'
      } else {
        direction = 'descending'
      }
      params.sort = {
        direction: direction,
        timestamp: 'last_edited_time',
      }
    }
    if (flags.property == 'database' || flags.property == 'page') {
      params.filter = {
        value: flags.property,
        property: 'object',
      }
    }
    if (flags.start_cursor) {
      params.start_cursor = flags.start_cursor
    }
    if (flags.page_size) {
      params.page_size = flags.page_size
    }

    if (process.env.DEBUG) {
      console.log(params)
    }
    const res = await notion.search(params)

    if (flags.raw) {
      outputRawJson(res)
      this.exit(0)
    }

    const columns = {
      title: {
        get: (row: DatabaseObjectResponse | PageObjectResponse) => {
          if (row.object == 'database') {
            return getDbTitle(row)
          }
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
    ux.table(res.results, columns, options)
  }
}
