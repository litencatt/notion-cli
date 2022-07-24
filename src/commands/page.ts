import { Command, Flags } from '@oclif/core'
import { retreivePage, createPage, updatePage } from '../notion'
import * as fs from 'fs'
import * as path from 'path'
import { markdownToBlocks } from '@tryfabric/martian'

export default class Page extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    page_id: Flags.string({ char: 'p' }),
    database_id: Flags.string({ char: 'd' }),
    file_path: Flags.string({ char: 'f' }),
    retrieve: Flags.boolean({ char: 'r' }),
    create: Flags.boolean({ char: 'c' }),
    update: Flags.boolean({ char: 'u' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Page)
    // Page retrieve
    if (flags.retrieve && flags.page_id) {
      const res = await retreivePage(flags.page_id)
      console.dir(res, { depth: null })
    }

    // Page create
    if (flags.create && flags.database_id && flags.file_path) {
      const fp = path.join('./', flags.file_path)
      const fn = path.basename(flags.file_path)
      const markdown = fs.readFileSync(fp, { encoding: 'utf-8' })
      const blocks = markdownToBlocks(markdown)
      const res = await createPage(flags.database_id, fn, blocks)
      console.dir(res, { depth: null })
    }

    // Page update
    if (flags.update && flags.page_id) {
      const res = await updatePage(flags.page_id)
      console.dir(res, { depth: null })
    }
  }
}
