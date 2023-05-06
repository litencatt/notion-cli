import { Args, Command} from '@oclif/core'
import * as notion from '../../notion'

export default class UserRetrieve extends Command {
  static description = 'Retrieve a user'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    user_id: Args.string(),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(UserRetrieve)
    const res = await notion.retrieveUser(args.user_id)
    console.dir(res, { depth: null })
  }
}
