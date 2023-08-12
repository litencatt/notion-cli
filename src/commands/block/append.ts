import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'

export default class BlockAppend extends Command {
  static description = 'Append block children'

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
    block_id: Args.string({required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockAppend)

    const res = await notion.appendBlockChildren(args.block_id)
    console.dir(res, { depth: null })
  }
}
