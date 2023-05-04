import { Command, Flags } from '@oclif/core'
import {
  retrievePage,
  retrievePageProperty,
  createPage,
  updatePage,
} from '../notion'
import * as fs from 'fs'
import * as path from 'path'
import { markdownToBlocks } from '@tryfabric/martian'

export default class Page extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    // actions
    retrieve: Flags.boolean({ char: 'r', dependsOn: ['page_id'] }),
    create: Flags.boolean({ char: 'c' }),
    update: Flags.boolean({ char: 'u', dependsOn: ['page_id'] }),
    retrieve_property: Flags.boolean(),

    // params
    page_id: Flags.string({ char: 'p' }),
    parent_page_id: Flags.string(),
    property_id: Flags.string(),
    database_id: Flags.string({ char: 'd' }),
    file_path: Flags.string({ char: 'f' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Page)
    // Retrieve a page
    if (flags.retrieve && flags.page_id) {
      const res = await retrievePage(flags.page_id)
      console.dir(res, { depth: null })
    }
    // Retrieve a page property item
    if (flags.retrieve_property && flags.page_id && flags.property_id) {
      const res = await retrievePageProperty(flags.page_id, flags.property_id)
      console.dir(res, { depth: null })
    }
    // Create a page
    if (flags.create && flags.database_id && flags.file_path) {
      const fp = path.join('./', flags.file_path)
      const fn = path.basename(flags.file_path)
      const markdown = fs.readFileSync(fp, { encoding: 'utf-8' })
      const blocks = markdownToBlocks(markdown)
      const res = await createPage(flags.database_id, fn, blocks)
      console.dir(res, { depth: null })
    }
    // Update a page
    if (flags.update && flags.page_id) {
      const res = await updatePage(flags.page_id, {})
      console.dir(res, { depth: null })
    }
  }
}
