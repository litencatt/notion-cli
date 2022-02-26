import {
  queryDatabase,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { Command, Flags } from '@oclif/core'
import { retrieve, query } from '../notion'

export default class Db extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    retrieve: Flags.boolean({ char: 'r' }),
    query: Flags.boolean({ char: 'q' }),
    filter: Flags.string({ char: 'f' }),
  }

  static args = [{ name: 'databaseId' }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Db)

    if (flags.retrieve) {
      const res = await retrieve(args.databaseId)
      console.log(res)
    }
    if (flags.query) {
      const res = await query(args.databaseId, flags.filter as string)
      console.log(res)
    }
  }
}
