import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class BlockRetrieve extends Command {
  static description = 'Retrieve a block'

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
    const {args, flags} = await this.parse(BlockRetrieve)

    const res = await notion.retrieveBlock(args.blockId)
    console.dir(res, { depth: null })
  }
}
