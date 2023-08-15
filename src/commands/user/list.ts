import {Command, Flags, ux} from '@oclif/core'
import {
  UserObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../notion'

export default class UserList extends Command {
  static description = 'List all users'

  static aliases: string[] = ['user:l']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    raw: Flags.boolean(),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(UserList)
    const res = await notion.listUser()
    if (flags.raw) {
      console.dir(res, { depth: null })
      this.exit(0)
    }

    const columns = {
      id: {},
      name: {},
      object: {},
      type: {},
      person_or_bot: {
        header: 'person/bot',
        get: (row: UserObjectResponse) => {
          if (row.type === 'person') {
            return row.person
          }
          return row.bot
        }
      },
      avatar_url: {},
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags
    }
    ux.table(res.results, columns, options)
  }
}
