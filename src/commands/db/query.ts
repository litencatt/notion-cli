import {Args, Command, Flags} from '@oclif/core'
import * as notion from '../../notion'
import {
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import * as fs from 'fs'
import * as path from 'path'
import * as dayjs from 'dayjs'
import {
    buildOneDepthJson,
    buildFilterPagePrompt,
    buildDatabaseQueryFilter,
    getDbChoices,
    getPromptChoices,
    getFilterFields,
    onCancel,
  } from '../../helper'
import { Parser } from '@json2csv/plainjs';

const  prompts  = require('prompts')

export default class DbQuery extends Command {
  static description = 'Query a database'

  static examples = [
    `$ notion-cli db query DATABASE_ID`,
    `$ notion-cli db query DATABASE_ID -f '{"and":[]}'`,
    `$ notion-cli db query DATABASE_ID -f ./path/to/filter.json`,
    `$ notion-cli db query DATABASE_ID -c`,
  ]

  static args = {
    databaseId: Args.string(),
  }

  static flags = {
    rowFilter: Flags.string({
      char: 'r',
      description: 'JSON stringified filter string'
    }),
    fileFilter: Flags.string({
      char: 'f',
      description: 'JSON stringified filter file path'
    }),
    output: Flags.string({
      char: 'o',
      description: 'Output format',
      options: ['csv', 'json'],
      default: 'json',
    }),
  }

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(DbQuery)

    let databaseId = args.databaseId
    if (databaseId == undefined) {
      const dbChoices = await getDbChoices()
      const promptSelectedDbResult = await prompts([{
        message: 'Select a database to query',
        type: 'autocomplete',
        name: 'database_id',
        choices: dbChoices
      }], { onCancel })
      // console.log(promptSelectedDbResult)
      databaseId = promptSelectedDbResult.database_id
    }

    // Set a filter
    let filter: object | undefined
    try {
      if (flags.rowFilter != undefined) {
        filter = JSON.parse(flags.filter)
      } else if (flags.fileFilter != undefined) {
        const fp = path.join('./', flags.filter)
        const fj = fs.readFileSync(fp, { encoding: 'utf-8' })
        filter = JSON.parse(fj)
      } else {
        let CombineOperator = undefined

        const promptAddFilterResult = await prompts([{
          message: 'Add filter?',
          type: 'confirm',
          name: 'value',
          initial: true
        }], { onCancel })

        const selectedDb = await notion.retrieveDb(databaseId)
        const dbPropsChoices = await getPromptChoices(selectedDb)
        console.dir(dbPropsChoices, {depth: null})

        while (promptAddFilterResult.value) {
          // Choice the operator first time and keep using it.
          if (filter != undefined && CombineOperator == undefined) {
            const promptAndOrPropResult = await prompts([{
              message: 'Select and/or',
              type: 'autocomplete',
              name: 'operator',
              choices: [
                { title: 'and'},
                { title: 'or'},
              ]
            }], { onCancel })
            // rebuild filter object with choose operator
            const tmp = filter
            CombineOperator = promptAndOrPropResult.operator
            filter = {[CombineOperator]: [tmp]}
          }
          console.dir(filter, {depth: null})

          const promptSelectFilterPropResult = await prompts([{
            message: 'Select a property for filter by',
            type: 'autocomplete',
            name: 'property',
            choices: dbPropsChoices
          }], { onCancel })
          // 選ばれたプロパティのタイプに応じて次のプロンプト情報を作成する.
          // 同一DBでプロパティ名は必ずユニークなので対象プロパティが確定する
          const selectedProp = Object.entries(selectedDb.properties)
            .find(([_, prop]) => {
              // prompt result => "prperty_name <property_type>"
              return prop.name == promptSelectFilterPropResult.property.split(" <")[0]
            })
          // console.log(selectedProp2)
          if (selectedProp[1].type == undefined) {
            console.log("selectedProp.type is undefined")
            return
          }

          // Support only filter fields of the following types
          // - Number
          // - Select
          // - Multi-select
          // - Relation
          const fieldChoices = await getFilterFields(selectedProp[1].type)
          const promptFieldResult = await prompts([{
            message: 'Select a field of filter',
            type: 'autocomplete',
            name: 'value',
            choices: fieldChoices
          }], { onCancel })
          const filterField = promptFieldResult.value

          let filterValue: string | string[] | boolean = true
          if (!['is_empty', 'is_not_empty'].includes(filterField)) {
          // Select/Input a value for filtering
            const fpp = await buildFilterPagePrompt(selectedProp[1])
            const promptFilterPropResult = await prompts([fpp], { onCancel })
            filterValue = promptFilterPropResult.value
          }
          console.log(filterValue)
          const filterObj = await buildDatabaseQueryFilter(
            selectedProp[1].name,
            selectedProp[1].type,
            filterField,
            filterValue
          )
          if (filterObj == null) {
            console.log("Error buildFilter")
            return
          }

          // set or push a build filter
          if (filter == undefined) {
            filter = filterObj
          } else {
            filter[CombineOperator].push(filterObj)
          }
          console.log(filter)

          const promptConfirmAddFilterFinishResult = await prompts([{
            message: 'Finish add filter?',
            type: 'confirm',
            name: 'value',
            initial: true
          }], { onCancel })
          if (promptConfirmAddFilterFinishResult.value) {
            break
          }
        }
      }
    } catch(e) {
      this.error(e, {exit: 1})
    }
    if (filter != undefined) {
      console.log("Filter:")
      console.dir(filter, {depth: null})
      console.log("")

      const promptConfirmSaveFilterResult = await prompts([{
        message: 'Save this filter to a file?',
        type: 'confirm',
        name: 'value',
        initial: false
      }], { onCancel })
      if (promptConfirmSaveFilterResult.value) {
        const promptFileNameResult = await prompts({
          message: 'Filename',
          type: 'text',
          name: 'filename',
          initial: dayjs().format('YYYYMMDD_HHmmss')
        });
        const fileName = `${promptFileNameResult.filename}.json`
        fs.writeFileSync(fileName, JSON.stringify(filter, null, 2))
        console.log(`Saved to ${fileName}\n`)
      }
    }

    const res = await notion.queryDb(databaseId, filter)
    if (res.length == 0) {
      console.log("No pages found")
      this.exit(0)
    }

    switch (flags.output) {
      case 'csv':
        const {oneDepthJson, relationJson} = await buildOneDepthJson(res)
        const parser = new Parser()
        const csv = parser.parse(oneDepthJson)
        console.log(csv)

        // TODO:
        // あるページに対してリレーション関係にあるページIDの情報のみCSV出力したければ、
        // 以下property_nameを指定すれば出力可能にはなるがまだ未実装
        // page_id, relation_page_id
        // const parser2 = new Parser()
        // const rel = parser2.parse(relationJson["property_name"])
        // console.log(rel)
        break
      default:
        console.dir(res, { depth: null })
    }
  }
}
