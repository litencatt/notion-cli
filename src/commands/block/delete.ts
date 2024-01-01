import { Args, Command, Flags, ux } from '@oclif/core'
import * as notion from '../../notion'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getBlockPlainText, outputRawJson } from '../../helper'

export default class BlockDelete extends Command {
  static description = 'Delete a block'

  static aliases: string[] = ['block:d']

  static examples = [
    {
      description: 'Delete a block',
      command: `$ notion-cli block delete BLOCK_ID`,
    },
    {
      description: 'Delete a block and output raw json',
      command: `$ notion-cli block delete BLOCK_ID -r`,
    },
  ]

  static args = {
    block_id: Args.string({ required: true }),
  }

  static flags = {
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(BlockDelete)

    const res = await notion.deleteBlock(args.block_id)
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
        },
      },
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags,
    }
    ux.table([res], columns, options)
  }
}
