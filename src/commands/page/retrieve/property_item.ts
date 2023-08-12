import {Args, Command} from '@oclif/core'
import * as notion from '../../../notion'

export default class PageRetrievePropertyItem extends Command {
  static description = 'Retrieve a page property item'

  static examples = [
    '<%= config.bin %> <%= command.id %> <page_id> <page_property_id>',
  ]

  static args = {
    pageId: Args.string({ required: true }),
    propertyId: Args.string({ required: true }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(PageRetrievePropertyItem)

    const res = await notion.retrievePageProperty(args.pageId, args.propertyId)
    console.dir(res, { depth: null })
  }
}
