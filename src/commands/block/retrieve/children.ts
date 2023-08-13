import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../../notion'

export default class BlockRetrieveChildren extends Command {
  static description = 'Retrieve block children'

  static aliases: string[] = ['block:r:c']

  static examples = [
    '<%= config.bin %> <%= command.id %> BLOCK_ID',
  ]

  static args = {
    block_id: Args.string({
      description: 'block_id or page_id',
      required: true
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockRetrieveChildren)

    // TODO: Add support start_cursor, page_size
    const res = await notion.retrieveBlockChildren(args.block_id)
    console.dir(res, { depth: null })
  }
}
