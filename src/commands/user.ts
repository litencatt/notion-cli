import { Command, Flags } from '@oclif/core'
import { retrieveUser, listUser, botUser } from '../notion'

export default class User extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    // actions
    retrieve: Flags.boolean({ char: 'r', dependsOn: ['user_id'] }),
    list: Flags.boolean({ char: 'l' }),
    bot: Flags.boolean({ char: 'b' }),

    // params
    user_id: Flags.string(),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(User)
    // Retrieve a user
    if (flags.retrieve && flags.user_id) {
      const res = await retrieveUser(flags.user_id)
      console.dir(res, { depth: null })
    }
    // List all users
    if (flags.list) {
      const res = await listUser()
      console.dir(res, { depth: null })
    }
    // Retrieve your token's bot user
    if (flags.bot) {
      const res = await botUser()
      console.dir(res, { depth: null })
    }
  }
}
