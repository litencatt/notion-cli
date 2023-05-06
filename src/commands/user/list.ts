import {Command} from '@oclif/core'
import * as notion from '../../notion'

export default class UserList extends Command {
  static description = 'List all users'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    // const {args, flags} = await this.parse(UserList)
    const res = await notion.listUser()
    console.dir(res, { depth: null })
  }
}
