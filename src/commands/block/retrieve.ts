import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class BlockRetrieve extends Command {
  static description = 'Retrieve a block'

  static examples = [
    '<%= config.bin %> <%= command.id %> BLOCK_ID',
  ]

  static args = {
    block_id: Args.string({required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockRetrieve)
    const res = await notion.retrieveBlock(args.block_id)
    console.dir(res, { depth: null })
  }
}
