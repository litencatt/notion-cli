import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import {
  AppendBlockChildrenParameters,
  BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import {
  getBlockPlainText,
  outputRawJson
} from '../../helper'

export default class BlockAppend extends Command {
  static description = 'Append block children'

  static aliases: string[] = ['block:a']

  static examples = [
    '<%= config.bin %> <%= command.id %> BLOCK_ID CHILDREN AFTER',
  ]

  static args = {
    block_id: Args.string({required: true}),
    children: Args.string({required: true}),
    after: Args.string({required: false}),
  }

  static flags = {
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
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
    if (flags.raw) {
      outputRawJson(res)
      this.exit(0)
    }

    const columns = {
      object: {},
      id: {},
      type: {},
      parent: {},
      content: {
        get: (row: BlockObjectResponse) => {
          return getBlockPlainText(row)
        }
      }
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags
    }
    ux.table(res.results, columns, options)
  }
}
