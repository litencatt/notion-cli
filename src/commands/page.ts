import { Command, Flags } from '@oclif/core'
import { retreivePage, createPage, updatePage } from '../notion'

export default class Page extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    page_id: Flags.string(),
    database_id: Flags.string(),
    retrieve: Flags.boolean({ char: 'r' }),
    create: Flags.boolean({ char: 'c' }),
    update: Flags.boolean({ char: 'u' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Page)
    if (flags.retrieve && flags.page_id) {
      const res = await retreivePage(flags.page_id)
      console.log(res)
    }
    if (flags.create && flags.database_id) {
      const res = await createPage(flags.database_id)
      console.log(res)
    }
    if (flags.update && flags.page_id) {
      const res = await updatePage(flags.page_id)
      console.log(res)
    }
  }
}
