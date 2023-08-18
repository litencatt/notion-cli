import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import * as fs from 'fs'
import * as path from 'path'
import { markdownToBlocks } from '@tryfabric/martian'
import {
  CreatePageParameters,
  PageObjectResponse,
  BlockObjectRequest,
} from '@notionhq/client/build/src/api-endpoints'
import {
    getPageTitle,
    outputRawJson
  } from '../../helper'

export default class PageCreate extends Command {
  static description = 'Create a page'

  static aliases: string[] = ['page:c']

  static examples = [
    '<%= config.bin %> <%= command.id %> -f ./path/to/source.md -p <parent_page_id>',
  ]

  static flags = {
    parent_page_id: Flags.string({
      char: 'p',
    }),
    parent_db_id: Flags.string({
      char: 'd',
    }),
    file_path: Flags.string({
      char: 'f',
      description: 'Path to a source markdown file',
    }),
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageCreate)

    let pageProps: CreatePageParameters
    let pageParent: CreatePageParameters['parent']
    if (flags.parent_page_id) {
      pageParent = {
        page_id: flags.parent_page_id,
      }
    } else {
      pageParent = {
        database_id: flags.parent_db_id,
      }
    }

    if (flags.filePath) {
      const p = path.join('./', flags.file_path)
      const fileName = path.basename(flags.file_path)
      const md = fs.readFileSync(p, { encoding: 'utf-8' })
      const blocks = markdownToBlocks(md)

      // TODO: Add support for creating a page from a template
      pageProps = {
        parent: pageParent,
        properties: {
          Name: {
            title: [{ text: {content: fileName} }],
          },
        },
        children: blocks as BlockObjectRequest[],
      }
    } else {
      pageProps = {
        parent: pageParent,
        properties: {}
      }
    }
    const res = await notion.createPage(pageProps)
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
