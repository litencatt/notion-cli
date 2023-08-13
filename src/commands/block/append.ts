import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import {
  AppendBlockChildrenParameters
} from '@notionhq/client/build/src/api-endpoints'

export default class BlockAppend extends Command {
  static description = 'Append block children'

  static examples = [
    '<%= config.bin %> <%= command.id %> BLOCK_ID CHILDREN AFTER',
  ]

  static args = {
    block_id: Args.string({required: true}),
    children: Args.string({required: true}),
    after: Args.string({required: false}),
  }

  // TODO: Add support children params building prompt
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockAppend)
    const params: AppendBlockChildrenParameters = {
      block_id: args.block_id,
      children: JSON.parse(args.children),
    }
    if (args.after) {
      params.after = args.after
    }
    const res = await notion.appendBlockChildren(params)
    console.dir(res, { depth: null })
  }
}
