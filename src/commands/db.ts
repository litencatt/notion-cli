import {
  queryDatabase,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { Command, Flags } from '@oclif/core'
import { queryDb, createDb, updateDb, retrieveDb } from '../notion'

export default class Db extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    database_id: Flags.string({ char: 'd' }),

    query: Flags.boolean({ char: 'q', dependsOn: ['database_id'] }),
    filter: Flags.string({ char: 'f' }),

    create: Flags.boolean({ char: 'c', dependsOn: ['page_id'] }),
    page_id: Flags.string(),

    update: Flags.boolean({ char: 'u', dependsOn: ['database_id'] }),

    retrieve: Flags.boolean({ char: 'r', dependsOn: ['database_id'] }),
    propertyList: Flags.string({ char: 'p' }),
    onlyValue: Flags.boolean({ char: 'P' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Db)

    if (flags.database_id && flags.query) {
      const res = await queryDb(flags.database_id, flags.filter as string)
      console.dir(res, { depth: null })
    }
    if (flags.create && flags.page_id) {
      const res = await createDb(flags.page_id)
      console.dir(res, { depth: null })
    }
    if (flags.database_id && flags.update) {
      const res = await updateDb(flags.database_id)
      console.dir(res, { depth: null })
    }
    if (flags.database_id && flags.retrieve) {
      const options = {
        propertyList: flags.propertyList,
        onlyValue: flags.onlyValue,
      }
      const res = await retrieveDb(flags.database_id, options)
      console.dir(res, { depth: null })
    }
  }
}
