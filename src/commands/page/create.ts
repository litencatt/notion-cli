import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import * as fs from 'fs'
import * as path from 'path'
import { markdownToBlocks } from '@tryfabric/martian'
import {
  CreatePageParameters,
  BlockObjectRequest,
} from '@notionhq/client/build/src/api-endpoints'

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
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageCreate)

    let pageProps: CreatePageParameters
    let parent: CreatePageParameters['parent']
    if (!flags.filePath) {
      if (flags.parent_page_id) {
        parent = {
          page_id: flags.parent_page_id,
        }
      } else {
        parent = {
          database_id: flags.parent_db_id,
        }
      }
      pageProps = {
        parent: parent,
        properties: {}
      }
    } else {
      const p = path.join('./', flags.file_path)
      const title = path.basename(flags.file_path)
      const md = fs.readFileSync(p, { encoding: 'utf-8' })
      const blocks = markdownToBlocks(md)

      // TODO: Add support for creating a page from a template
      pageProps = {
        parent: {
          database_id: args.parent_id,
        },
        properties: {
          Name: {
            title: [{ text: {content: title} }],
          },
        },
        children: blocks as BlockObjectRequest[],
      }
    }
    const res = await notion.createPage(pageProps)
    console.dir(res, { depth: null })
  }
}
