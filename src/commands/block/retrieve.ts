import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import {
  BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import {
  getBlockPlainText,
  outputRawJson,
} from '../../helper'

export default class BlockRetrieve extends Command {
  static description = 'Retrieve a block'

  static aliases: string[] = ['block:r']

  static examples = [
    '<%= config.bin %> <%= command.id %> BLOCK_ID',
  ]

  static args = {
    block_id: Args.string({required: true}),
  }

  static flags = {
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BlockRetrieve)

    const res = await notion.retrieveBlock(args.block_id)
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
