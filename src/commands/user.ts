import { Command, Flags } from '@oclif/core'
import { retreiveUser, listUser } from '../notion'

export default class User extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    retrieve: Flags.boolean({ char: 'r', dependsOn: ['user_id'] }),
    user_id: Flags.string(),
    list: Flags.boolean({ char: 'l' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(User)

    if (flags.retrieve && flags.user_id) {
      const res = await retreiveUser(flags.user_id)
      console.dir(res, { depth: null })
    }
    if (flags.list) {
      const res = await listUser()
      console.dir(res, { depth: null })
    }
  }
}
