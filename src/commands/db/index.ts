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

export default class Db extends Command {
  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    database_id: Flags.string({ char: 'd' }),
    filter: Flags.string({ char: 'f' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Db)

    // Run prompt when no flags
    if (Object.keys(flags).length === 0) {
      // Search all accessible DBs
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

      // Get DB properties
      // FIXME: Increase support types
      const selectedDb = await notion.retrieveDb(promptSelectedDbResult.database_id, {})
      // console.dir(selectedDb, {depth: null})
      const filterPropChoices = await getPromptChoices(selectedDb)

      // Build a filter
      let filter: object | undefined
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
            message: 'select and/or',
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

        // Select a property for filter
        const promptPropResult = await prompts([{
          type: 'autocomplete',
          name: 'property',
          message: 'select a property for filter by',
          choices: filterPropChoices
        }], { onCancel })
        // 選ばれたプロパティのタイプに応じて次のプロンプト情報を作成する.
        // 同一DBでプロパティ名は必ずユニークなので対象プロパティが確定する
        const selectedProp = Object.entries(selectedDb.properties)
          .find(([_, prop]) => {
            return prop.name == promptPropResult.property
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
          message: 'select a field of filter',
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
      console.log("Filter:")
      console.dir(filter, {depth: null})
      console.log("")

      // Get filtered pages
      const pages = await notion.queryDb(
        promptSelectedDbResult.database_id,
        JSON.stringify(filter)
      )
      if (pages.length == 0) {
        console.log("No pages found")
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

      const promptConfirmUpdatePropResult = await prompts([{
        type: 'confirm',
        name: 'value',
        message: 'update a property of those pages?',
        initial: true
      }], { onCancel })
      if (!promptConfirmUpdatePropResult.value) {
        return
      }

      // Select a update property
      const promptSelectUpdatePropResult = await prompts([{
        type: 'autocomplete',
        name: 'property',
        message: 'select an update property',
        choices: filterPropChoices
      }], { onCancel })
      const updateTargetProp = Object.entries(selectedDb.properties)
        .find(([_, prop]) => {
          return prop.name == promptSelectUpdatePropResult.property
        })
      if (updateTargetProp[1].type == undefined) {
        console.log(`${updateTargetProp} is not found`)
        return
      }

      // Input/Select update value(s)
      const upp = await buildFilterPagePrompt(updateTargetProp[1])
      const promptUpdatePropValueResult = await prompts([upp], { onCancel })
      const updateData = await buildPagePropUpdateData(
        updateTargetProp[1].name,
        updateTargetProp[1].type,
        promptUpdatePropValueResult.value
      )

      // Update property
      console.log("Start update pages")
      for (const pageId of filteredPageIDs) {
        console.log(`page_id: ${pageId}, updateData:`)
        console.dir(updateData, {depth: null})
        await notion.updatePage(pageId, updateData)
      }
      console.log("End update pages")
    }
  }
}

