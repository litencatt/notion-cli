import {Args, Command} from '@oclif/core'
import * as notion from '../../../notion'
import { outputRawJson } from '../../../helper'

export default class PageRetrievePropertyItem extends Command {
  static description = 'Retrieve a page property item'

  static aliases: string[] = ['page:r:pi']

  static examples = [
    '<%= config.bin %> <%= command.id %> <page_id> <page_property_id>',
  ]

  static args = {
    page_id: Args.string({ required: true }),
    property_id: Args.string({ required: true }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(PageRetrievePropertyItem)

    const res = await notion.retrievePageProperty(args.page_id, args.property_id)
    outputRawJson(res)
  }
}
