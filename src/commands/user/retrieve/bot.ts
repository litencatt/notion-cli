import { Args, Command} from '@oclif/core'
import * as notion from '../../../notion'

export default class UserRetrieveBot extends Command {
  static description = 'Retrieve a bot user'

  static aliases: string[] = ['user:r:b']

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {}

  public async run(): Promise<void> {
    // const {args} = await this.parse(UserRetrieveBot)
    const res = await notion.botUser()
    console.dir(res, { depth: null })
  }
}
