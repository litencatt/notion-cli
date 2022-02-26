import { Command, Flags } from '@oclif/core'
import {
  retreiveBlock,
  updateBlock,
  retreiveBlockChildren,
  appendBlockChildren,
  deleteBlock,
} from '../notion'

export default class Block extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    retrieve: Flags.boolean({ char: 'r' }),
    update: Flags.boolean({ char: 'u' }),
    delete: Flags.boolean({ char: 'd' }),
    retreiveChildren: Flags.boolean({ char: 'c' }),
    appendChildren: Flags.boolean({ char: 'a' }),
  }

  static args = [{ name: 'block_id' }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Block)
    if (flags.retrieve) {
      const res = await retreiveBlock(args.block_id)
      console.log(res)
    }
    if (flags.update) {
      const res = await updateBlock(args.block_id)
      console.log(res)
    }
    if (flags.retreiveChildren) {
      const res = await retreiveBlockChildren(args.block_id)
      console.log(res)
    }
    if (flags.appendChildren) {
      const res = await appendBlockChildren(args.block_id)
      console.log(res)
    }
    if (flags.delete) {
      const res = await deleteBlock(args.block_id)
      console.log(res)
    }
  }
}
