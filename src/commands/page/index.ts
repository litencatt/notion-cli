import { Command, Flags } from '@oclif/core'

export default class Page extends Command {
  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {}

  public async run(): Promise<void> {
    const { flags } = await this.parse(Page)
  }
}
