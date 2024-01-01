import { Command, Flags, ux } from '@oclif/core'
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../../notion'
import { outputRawJson } from '../../helper'

export default class UserList extends Command {
  static description = 'List all users'

  static aliases: string[] = ['user:l']

  static examples = [
    {
      description: 'List all users',
      command: `$ notion-cli user list`,
    },
    {
      description: 'List all users and output raw json',
      command: `$ notion-cli user list -r`,
    },
  ]

  static flags = {
    raw: Flags.boolean({
      char: 'r',
      description: 'output raw json',
    }),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(UserList)
    const res = await notion.listUser()
    if (flags.raw) {
      outputRawJson(res)
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
        },
      },
      avatar_url: {},
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags,
    }
    ux.table(res.results, columns, options)
  }
}
