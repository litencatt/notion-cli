import { Command, Flags } from '@oclif/core'
import { retrieve } from '../notion'

export default class Db extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    retrieve: Flags.boolean({ char: 'r' }),
  }

  static args = [{ name: 'databaseId' }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Db)

    if (flags.retrieve) {
      const res = await retrieve(args.databaseId)
      console.log(res)
    }
  }
}
