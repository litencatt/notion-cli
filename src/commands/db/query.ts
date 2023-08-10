import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import * as fs from 'fs'
import * as path from 'path'
import { buildOneDepthJson } from '../../helper'
import { Parser } from '@json2csv/plainjs';

export default class DbQuery extends Command {
  static description = 'Query a database'

  static examples = [
    `$ notion-cli db query DATABASE_ID`,
    `$ notion-cli db query DATABASE_ID -f '{"and":[]}'`,
    `$ notion-cli db query DATABASE_ID -f ./path/to/filter.json`,
    `$ notion-cli db query DATABASE_ID -c`,
  ]

  static args = {
    database_id: Args.string({required: true}),
  }

  static flags = {
    filter: Flags.string({ char: 'f', description: 'JSON stringified filter string or json file path' }),
    csvOutput: Flags.boolean({ char: 'c' }),

  }

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(DbQuery)

    let filter: object | undefined
    try {
      if (flags.filter) {
        // JSONにパース可能な場合は、JSONとしてパースしてfilterに代入
        // JSONにパース不可能な場合は、ファイルとして読み込んでJSONとしてパースしてfilterに代入
        try {
          filter = JSON.parse(flags.filter)
        } catch(e) {
          const fp = path.join('./', flags.filter)
          const fj = fs.readFileSync(fp, { encoding: 'utf-8' })
          filter = JSON.parse(fj)
        }
      }
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

      // あるページに対してリレーション関係にあるページIDの情報のみCSV出力したければ、
      // 以下property_nameを指定すれば出力可能
      // page_id, relation_page_id
      // const parser2 = new Parser()
      // const rel = parser2.parse(relationJson["property_name"])
      // console.log(rel)
    } else {
      console.dir(res, { depth: null })
    }
  }
}
