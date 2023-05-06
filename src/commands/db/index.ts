import { Command, Flags } from '@oclif/core'
const  prompts  = require('prompts')
import * as notion from '../../notion'
import {
  onCancel,
  buildFilterPagePrompt,
  buildDatabaseQueryFilter,
  buildPagePropUpdateData,
  getPromptChoices,
  getFilterFields,
} from '../../helper'
import { isFullDatabase, isFullPage } from '@notionhq/client'
import * as fs from 'fs'
import * as path from 'path'
import * as dayjs from 'dayjs'

export default class Db extends Command {
  static description = 'database operation on prompt'

  static examples = [
    `$ notion-cli db`,
    `$ notion-cli db -d 84ea0d76-51aa-4615-95e4-1fb8db40072c`,
    `$ notion-cli db -d 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/filter.json`,
    `$ notion-cli db -d 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/filter.json -u path/to/update.json`,
  ]

  static flags = {
    database_id: Flags.string({ char: 'd' }),
    filter_json_path: Flags.string({ char: 'f' }),
    update_json_path: Flags.string({ char: 'u' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Db)

    // Search all accessible DBs
    let databaseId: string
    if (flags.database_id == undefined) {
      const dbs = await notion.searchDb()
      const dbChoices = []
      for (const db of dbs) {
        if (db.object != "database") {
          continue
        }
        if (!isFullDatabase(db)) {
          continue
        }
        if (db.title[0] == null) {
          continue
        }
        dbChoices.push({
          title: db.title[0].plain_text,
          value: db.id,
        })
      }
      const sortedDbChoices = dbChoices.sort((a,b)=> {
        return a.title.localeCompare(b.title)
      })

      // Select a DB
      const promptSelectedDbResult = await prompts([{
        type: 'autocomplete',
        name: 'database_id',
        message: 'Select a database',
        choices: sortedDbChoices
      }], { onCancel })
      console.log(promptSelectedDbResult)

      databaseId = promptSelectedDbResult.database_id
    } else {
      databaseId = flags.database_id
    }

    // Get DB properties
    // FIXME: Increase support types
    const selectedDb = await notion.retrieveDb(databaseId, {})
    // console.dir(selectedDb, {depth: null})
    const filterPropChoices = await getPromptChoices(selectedDb)

    // Build a filter
    let filter: object | undefined = undefined
    if (flags.filter_json_path != undefined) {
      const fp = path.join('./', flags.filter_json_path)
      const fj = fs.readFileSync(fp, { encoding: 'utf-8' })
      filter = JSON.parse(fj)
    } else {
      let CombineOperator = undefined
      const promptAddFilterResult = await prompts([{
        type: 'confirm',
        name: 'value',
        message: 'Add filter?',
        initial: true
      }], { onCancel })
      while (promptAddFilterResult.value) {
        // Choice the operator first time and keep using it.
        if (filter != undefined && CombineOperator == undefined) {
          const promptAndOrPropResult = await prompts([{
            type: 'autocomplete',
            name: 'operator',
            message: 'Select and/or',
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
        console.log(filter)

        // Select a property for filter
        const promptPropResult = await prompts([{
          type: 'autocomplete',
          name: 'property',
          message: 'Select a property for filter by',
          choices: filterPropChoices
        }], { onCancel })
        // 選ばれたプロパティのタイプに応じて次のプロンプト情報を作成する.
        // 同一DBでプロパティ名は必ずユニークなので対象プロパティが確定する
        const selectedProp = Object.entries(selectedDb.properties)
          .find(([_, prop]) => {
            // prompt result => "prperty_name <property_type>"
            return prop.name == promptPropResult.property.split(" <")[0]
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
          type: 'autocomplete',
          name: 'value',
          message: 'Select a field of filter',
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
          type: 'confirm',
          name: 'value',
          message: 'Finish add filter?',
          initial: true
        }], { onCancel })
        if (promptConfirmAddFilterFinishResult.value) {
          break
        }
      }
    }
    console.log("Filter:")
    console.dir(filter, {depth: null})
    console.log("")

    // Get filtered pages
    const pages = await notion.queryDb(
      databaseId,
      JSON.stringify(filter)
    )
    if (pages.length == 0) {
      console.log("No pages found")
    }
    const promptConfirmSaveFilterResult = await prompts([{
      type: 'confirm',
      name: 'value',
      message: 'Save this filter to a file?',
      initial: false
    }], { onCancel })
    if (promptConfirmSaveFilterResult.value) {
      const fileName = dayjs().format('YYYYMMDD_HHmmss') + ".json"
      fs.writeFileSync(fileName, JSON.stringify(filter, null, 2))
      console.log(`Save to ${fileName}\n`)
    }

    const promptConfirmUpdatePagesResult = await prompts([{
      type: 'confirm',
      name: 'value',
      message: 'Update a property of filtered pages?',
      initial: false
    }], { onCancel })
    if (!promptConfirmUpdatePagesResult.value) {
      return
    }

    // Get filtered page IDs
    console.log("Filtered Pages:")
    const filteredPageIDs = []
    for (const page of pages) {
      filteredPageIDs.push(page.id)

      if (page.object != "page") {
        continue
      }
      if (!isFullPage(page)) {
        continue
      }
      Object.entries(page.properties).forEach(([_, prop]) => {
        if (prop.type == "title") {
          console.log(`title: ${prop.title[0].plain_text}, page_id: ${page.id}`)
        }
      })
    }
    console.log("")

    let updateParams
    if (flags.update_json_path != undefined) {
      const up = path.join('./', flags.update_json_path)
      const uj = fs.readFileSync(up, { encoding: 'utf-8' })
      updateParams = JSON.parse(uj)
    } else {
      const promptConfirmUpdatePropResult = await prompts([{
        type: 'confirm',
        name: 'value',
        message: 'Update a property of those pages?',
        initial: true
      }], { onCancel })
      if (!promptConfirmUpdatePropResult.value) {
        return
      }
      // Select a update property
      const promptSelectUpdatePropResult = await prompts([{
        type: 'autocomplete',
        name: 'property',
        message: 'Select an update property',
        choices: filterPropChoices
      }], { onCancel })
      const updateTargetProp = Object.entries(selectedDb.properties)
        .find(([_, prop]) => {
          // prompt result => "prperty_name <property_type>"
          return prop.name == promptSelectUpdatePropResult.property.split(" <")[0]
        })
      if (updateTargetProp[1].type == undefined) {
        console.log(`${updateTargetProp} is not found`)
        return
      }

      // Input/Select update value(s)
      const upp = await buildFilterPagePrompt(updateTargetProp[1])
      const promptUpdatePropValueResult = await prompts([upp], { onCancel })
      updateParams = await buildPagePropUpdateData(
        updateTargetProp[1].name,
        updateTargetProp[1].type,
        promptUpdatePropValueResult.value
      )
    }
    console.log("Update params:")
    console.dir(updateParams, {depth: null})
    console.log("")

    const promptReconfirmUpdatePropResult = await prompts([{
      type: 'confirm',
      name: 'value',
      message: 'Update pages with this params?',
      initial: true
    }], { onCancel })
    if (!promptReconfirmUpdatePropResult.value) {
      return
    }

    // Update property
    console.log("Start update pages")
    for (const pageId of filteredPageIDs) {
      console.log(`page_id: ${pageId}`)
      await notion.updatePage(pageId, updateParams)
    }
    console.log("End update pages")
  }
}

