import {Args, Command, Flags, ux} from '@oclif/core'
import * as notion from '../../notion'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
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
import { isFullPage } from '@notionhq/client'

const  prompts  = require('prompts')

export default class DbQuery extends Command {
  static description = 'Query a database'

  static aliases: string[] = ['db:q']

  static examples = [
    {
      description: 'Query a db via interactive mode',
      command: `$ notion-cli db query`,
    },
    {
      description: 'Query a db via interactive mode with a specific database_id',
      command: `$ notion-cli db query DATABASE_ID`,
    },
    {
      description: 'Query a db with a specific database_id and raw filter string',
      command: `$ notion-cli db query -r='{"and": ...}' DATABASE_ID`,
    },
    {
      description: 'Query a db with a specific database_id and filter file',
      command: `$ notion-cli db query -f ./path/to/filter.json DATABASE_ID`,
    },
    {
      description: 'Query a db with a specific database_id and output format',
      command: `$ notion-cli db query -o csv DATABASE_ID`,
    },
  ]

  static args = {
    database_id: Args.string(),
  }

  static flags = {
    rawFilter: Flags.string({
      char: 'r',
      description: 'JSON stringified filter string'
    }),
    fileFilter: Flags.string({
      char: 'f',
      description: 'JSON filter file path'
    }),
    raw: Flags.boolean(),
    ...ux.table.flags(),
  }

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(DbQuery)

    let databaseId = args.database_id
    if (databaseId == undefined) {
      const dbChoices = await getDbChoices()
      const promptSelectedDbResult = await prompts([{
        message: 'Select a database to query',
        type: 'autocomplete',
        name: 'database_id',
        choices: dbChoices
      }], { onCancel })
      if (process.env.DEBUG) {
        this.log(promptSelectedDbResult)
      }
      databaseId = promptSelectedDbResult.database_id
    }

    // Set a filter
    let filter: object | undefined
    try {
      if (flags.rawFilter != undefined) {
        filter = JSON.parse(flags.rawFilter)
      } else if (flags.fileFilter != undefined) {
        const fp = path.join('./', flags.fileFilter)
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
        if (process.env.DEBUG) {
          console.dir(dbPropsChoices, {depth: null})
        }

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
            if (process.env.DEBUG) {
              console.dir(filter, {depth: null})
            }
          }

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
          if (process.env.DEBUG) {
            console.dir(selectedProp[1], {depth: null})
          }
          if (selectedProp[1].type == undefined) {
            this.logToStderr("selectedProp.type is undefined")
            return
          }

          const fieldChoices = await getFilterFields(selectedProp[1].type)
          if (fieldChoices == null) {
            this.logToStderr("selected property is not supported to filter")
            continue
          }

          const promptFieldResult = await prompts([{
            message: 'Select a field of filter',
            type: 'autocomplete',
            name: 'value',
            choices: fieldChoices
          }], { onCancel })
          const filterField = promptFieldResult.value
          if (process.env.DEBUG) {
            console.log(`filterField: ${filterField}`)
          }

          let filterValue: string | string[] | boolean = true
          if (!['is_empty', 'is_not_empty'].includes(filterField)) {
            const fpp = await buildFilterPagePrompt(selectedProp[1])
            const promptFilterPropResult = await prompts([fpp], { onCancel })
            filterValue = promptFilterPropResult.value
          }
          if (process.env.DEBUG) {
            console.log(`filterValue: ${filterValue}`)
          }
          const filterObj = await buildDatabaseQueryFilter(
            selectedProp[1].name,
            selectedProp[1].type,
            filterField,
            filterValue
          )
          if (filterObj == null) {
            this.logToStderr("buildDatabaseQueryFilter error")
            this.exit(1)
          }

          // set or push a build filter
          if (filter == undefined) {
            filter = filterObj
          } else {
            filter[CombineOperator].push(filterObj)
          }
          if (process.env.DEBUG) {
            console.log(filter)
          }

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
    if (filter != undefined && (flags.rawFilter == undefined && flags.fileFilter == undefined)) {
      console.log("")
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
        this.logToStderr(`Saved to ${fileName}\n`)
      }
    }

    const res = await notion.queryDb(databaseId, filter)

    if (flags.raw) {
      console.dir(res, { depth: null })
      this.exit(0)
    }

    const columns = {
      title: {
        get: (row: PageObjectResponse | PartialPageObjectResponse) => {
          if (isFullPage(row)) {
            let title: string
            Object.entries(row.properties).find(([_, prop]) => {
              if (prop.type === 'title') {
                title = prop.title[0] && prop.title[0].plain_text
              }
            })
            return title
          } else {
            return 'untitled'
          }
        },
      },
      object: {},
      id: {},
      url: {},
    }
    const options = {
      printLine: this.log.bind(this),
      ...flags
    }
    ux.table(res, columns, options)
  }
}
