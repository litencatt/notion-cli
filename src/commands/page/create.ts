import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import * as fs from 'fs'
import * as path from 'path'
import { markdownToBlocks } from '@tryfabric/martian'

export default class PageCreate extends Command {
  static description = 'Create a page'

  static examples = [
    `$ notion-cli page create 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/file.md`,
    `$ notion-cli page create 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/file.md -t Title`,
  ]

  static flags = {
    file_path: Flags.string({ char: 'f', description: 'path/to/***.md' }),
    title_name: Flags.string({ char: 't', description: 'title property name(default: Name)' }),
  }

  static args = {
    parent_id: Args.string({ char: 'p' }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PageCreate)

    // Support database_id only now
    const parent = {
      database_id: args.parent_id
    }
    const fp = path.join('./', flags.file_path)
    const fileName = path.basename(flags.file_path)
    const md = fs.readFileSync(fp, { encoding: 'utf-8' })
    const blocks = markdownToBlocks(md)
    let titlePropName = flags.title_name || "Name"
    const pageProps = {
      [titlePropName]: {
        title: [{ text: { content: fileName } }],
      },
    }
    const res = await notion.createPage(parent, pageProps, blocks)
    console.dir(res, { depth: null })
  }
}
