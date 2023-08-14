import {Command, Flags, ux} from '@oclif/core'
import * as notion from '../notion'
import { SearchParameters } from '@notionhq/client/build/src/api-endpoints';

export default class Search extends Command {
  static description = 'Search by title'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    output: Flags.string({
      description: 'Output format',
      options: ['json', 'table'],
      default: 'table',
    }),
    query: Flags.string({
      char: 'q',
      description: 'The text that the API compares page and database titles against',
    }),
    sort_direction: Flags.string({
      char: 'd',
      options: ['asc', 'desc'],
      description: 'The direction to sort results. The only supported timestamp value is "last_edited_time"',
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
      description: 'The number of results to return. The default is 5, with a minimum of 1 and a maximum of 100.',
      min: 1,
      max: 100,
      default: 5,
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

    switch (flags.output) {
      case 'json':
        console.dir(res.results, { depth: null })
        break

      case 'table':
      default:
        ux.table(res.results, {
          object: {},
          id: {},
          parent: {
            header: 'Parent type',
            get: (row: any) => row.parent.type,
          },
          url: {},
        }, {
          printLine: this.log.bind(this),
          ...flags
        })
    }
  }
}
