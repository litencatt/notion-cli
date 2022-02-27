import {
  queryDatabase,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { Command, Flags } from '@oclif/core'
import { retrieveDb, queryDb } from '../notion'

export default class Db extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    database_id: Flags.string({ char: 'd' }),

    query: Flags.boolean({ char: 'q', dependsOn: ['database_id'] }),
    filter: Flags.string({ char: 'f', dependsOn: ['query'] }),

    retrieve: Flags.boolean({ char: 'r', dependsOn: ['database_id'] }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Db)

    if (flags.database_id && flags.query) {
      const res = await queryDb(flags.database_id, flags.filter as string)
      console.log(res)
    }
    if (flags.database_id && flags.retrieve) {
      const res = await retrieveDb(flags.database_id)
      console.log(res)
    }
  }
}
