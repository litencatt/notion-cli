import { Args, Command, Flags } from '@oclif/core'
import {
  retrieveBlock,
  updateBlock,
  retrieveBlockChildren,
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
    retrieveChildren: Flags.boolean({ char: 'c' }),
    appendChildren: Flags.boolean({ char: 'a' }),
  }

  static args = {
    block_id: Args.string({descriptin: 'block_id', required: true}),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Block)
    // Retrieve a block
    if (flags.retrieve) {
      const res = await retrieveBlock(args.block_id)
      console.dir(res, { depth: null })
    }
    // Update a block
    if (flags.update) {
      const res = await updateBlock(args.block_id)
      console.dir(res, { depth: null })
    }
    // Retrieve block children
    if (flags.retrieveChildren) {
      const res = await retrieveBlockChildren(args.block_id)
      console.dir(res, { depth: null })
    }
    // Append block children
    if (flags.appendChildren) {
      const res = await appendBlockChildren(args.block_id)
      console.dir(res, { depth: null })
    }
    // Delete a block
    if (flags.delete) {
      const res = await deleteBlock(args.block_id)
      console.dir(res, { depth: null })
    }
  }
}
