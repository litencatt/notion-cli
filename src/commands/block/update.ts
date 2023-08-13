import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import { UpdateBlockParameters } from '@notionhq/client/build/src/api-endpoints'

export default class BlockUpdate extends Command {
  static description = 'Update a block'

  static aliases: string[] = ['block:u']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    block_id: Args.string({descriptin: 'block_id', required: true}),
  }

  static flags = {
    archived: Flags.boolean({ char: 'a'}),
  }

  // TODO: Add support for updating block type objects
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockUpdate)
    // Support only archived for now
    const params: UpdateBlockParameters = {
      block_id: args.block_id,
      archived: flags.archived,
    }
    const res = await notion.updateBlock(params)
    console.dir(res, { depth: null })
  }
}
