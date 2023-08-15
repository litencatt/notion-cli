import { Args, Command, Flags, ux} from '@oclif/core'
import {
  UserObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../../notion'

export default class UserRetrieveBot extends Command {
  static description = 'Retrieve a bot user'

  static aliases: string[] = ['user:r:b']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {}

  static flags = {
    raw: Flags.boolean(),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(UserRetrieveBot)
    const res = await notion.botUser()
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
    ux.table([res], columns, options)
  }
}
