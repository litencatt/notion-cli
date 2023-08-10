import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class BlockDelete extends Command {
  static description = 'Delete a block'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = {
    blockId: Args.string({descriptin: 'block_id', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockDelete)

    const res = await notion.deleteBlock(args.blockId)
    console.dir(res, { depth: null })
  }
}
