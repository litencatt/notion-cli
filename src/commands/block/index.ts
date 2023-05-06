import { Args, Command, Flags } from '@oclif/core'

export default class Block extends Command {
  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {}

  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Block)

  }
}
