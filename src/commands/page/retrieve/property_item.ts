import {Args, Command} from '@oclif/core'
import * as notion from '../../../notion'

export default class PageRetrievePropertyItem extends Command {
  static description = 'Retrieve a page property item'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    page_id: Args.string({ required: true }),
    property_id: Args.string({ required: true }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(PageRetrievePropertyItem)

    const res = await notion.retrievePageProperty(args.page_id, args.property_id)
    console.dir(res, { depth: null })
  }
}