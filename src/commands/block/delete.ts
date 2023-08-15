import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import { outputRawJson } from '../../helper'

export default class BlockDelete extends Command {
  static description = 'Delete a block'

  static aliases: string[] = ['block:d']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    block_id: Args.string({required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockDelete)
    const res = await notion.deleteBlock(args.block_id)
    outputRawJson(res)
  }
}
