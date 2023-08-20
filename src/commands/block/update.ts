import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import {
  UpdateBlockParameters,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import {
  outputRawJson,
  getBlockPlainText,
} from '../../helper'

export default class BlockUpdate extends Command {
  static description = 'Update a block'

  static aliases: string[] = ['block:u']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    block_id: Args.string({descriptin: 'block_id', required: true}),
  }

  static flags = {
    archived: Flags.boolean({ char: 'a'}),
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  // TODO: Add support for updating block type objects
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockUpdate)
    // Support only archived for now
    const params: UpdateBlockParameters = {
      block_id: args.block_id,
      archived: flags.archived,
    }
    const res = await notion.updateBlock(params)
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
    ux.table([res], columns, options)
  }
}
