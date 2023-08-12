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

  static examples = [
    '<%= config.bin %> <%= command.id %> -f ./path/to/source.md -p <parent_page_id>',
  ]

  static args = {
    parentId: Args.string({ char: 'p', required: true }),
  }

  static flags = {
    filePath: Flags.string({ char: 'f' }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageCreate)

    let pageProps: CreatePageParameters
    if (!flags.filePath) {
      pageProps = {
        // TODO: Add support for creating a page in a page
        parent: {
          database_id: args.parentId,
        },
        properties: {}
      }
    } else {
      const p = path.join('./', flags.filePath)
      const title = path.basename(flags.filePath)
      const md = fs.readFileSync(p, { encoding: 'utf-8' })
      const blocks = markdownToBlocks(md)

      // TODO: Add support for creating a page from a template
      pageProps = {
        parent: {
          database_id: args.parentId,
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
