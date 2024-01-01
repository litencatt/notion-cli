import { Args, Command, Flags, ux } from '@oclif/core'
import * as notion from '../../../notion'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getBlockPlainText, outputRawJson } from '../../../helper'

export default class BlockRetrieveChildren extends Command {
  static description = 'Retrieve block children'

  static aliases: string[] = ['block:r:c']

  static examples = [
    {
      description: 'Retrieve block children',
      command: `$ notion-cli block retrieve:children BLOCK_ID`,
    },
    {
      description: 'Retrieve block children and output raw json',
      command: `$ notion-cli block retrieve:children BLOCK_ID -r`,
    },
  ]

  static args = {
    block_id: Args.string({
      description: 'block_id or page_id',
      required: true,
    }),
  }

  static flags = {
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(BlockRetrieveChildren)

    // TODO: Add support start_cursor, page_size
    const res = await notion.retrieveBlockChildren(args.block_id)
    if (flags.raw) {
      outputRawJson(res)
      this.exit(0)
    }

    const columns = {
      object: {},
      id: {},
      type: {},
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
    ux.table(res.results, columns, options)
  }
}
