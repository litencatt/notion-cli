import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import * as fs from 'fs'
import * as path from 'path'
import { buildOneDepthJson } from '../../helper'
import { Parser } from '@json2csv/plainjs';

export default class DbQuery extends Command {
  static description = 'Query a database'

  static examples = [
    `$ notion-cli db query f929e92f257c4d8bb9d0c176ce24814d`,
    `$ notion-cli db query f929e92f257c4d8bb9d0c176ce24814d -f "{\"property\":\"Number\",\"number\":{\"equals\":2}}"`,
  ]

  static args = {
    database_id: Args.string({required: true}),
  }

  static flags = {
    filter: Flags.string({ char: 'f', description: 'JSON stringified filter string' }),
    csvOutput: Flags.boolean({ char: 'c' }),

  }

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(DbQuery)

    let filter: object | undefined
    try {
      if (flags.filter) {
        const fp = path.join('./', flags.filter)
        const fj = fs.readFileSync(fp, { encoding: 'utf-8' })
        filter = JSON.parse(fj)
      }
      // console.dir(filter, {depth: null})
    } catch(e) {
      console.log(e)
      filter = undefined
    }
    const res = await notion.queryDb(args.database_id, filter)
    if (flags.csvOutput) {
      const {oneDepthJson, relationJson} = await buildOneDepthJson(res)
      const parser = new Parser()
      const csv = parser.parse(oneDepthJson)
      console.log(csv)
    } else {
      console.dir(res, { depth: null })
    }
  }
}
