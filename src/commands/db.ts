import { Command, Flags } from '@oclif/core'
const  prompts  = require('prompts')
import * as notion from '../notion'
import {
  buildFilterPagePrompt,
  buildDatabaseQueryFilter,
  buildPagePropUpdateData,
  getNotionDbOptions,
  getPromptChoices,
  buildFilterPagePromptFromObj
} from '../helper'
import { isFullDatabase, isFullPage } from '@notionhq/client'


export default class Db extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    database_id: Flags.string({ char: 'd' }),

    query: Flags.boolean({ char: 'q', dependsOn: ['database_id'] }),
    filter: Flags.string({ char: 'f' }),

    create: Flags.boolean({ char: 'c', dependsOn: ['page_id'] }),
    page_id: Flags.string(),

    update: Flags.boolean({ char: 'u', dependsOn: ['database_id'] }),

    retrieve: Flags.boolean({ char: 'r', dependsOn: ['database_id'] }),
    propertyList: Flags.string({ char: 'p' }),
    onlyValue: Flags.boolean({ char: 'P' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Db)

    // Query a database
    if (flags.database_id && flags.query) {
      const res = await notion.queryDb(flags.database_id, flags.filter as string)
      console.dir(res, { depth: null })
    }
    // Create a database
    if (flags.create && flags.page_id) {
      const res = await notion.createDb(flags.page_id)
      console.dir(res, { depth: null })
    }
    // Update a database
    if (flags.database_id && flags.update) {
      // const res = await updateDb(flags.database_id)
      // console.dir(res, { depth: null })
    }
    // Retrieve a database
    if (flags.database_id && flags.retrieve) {
      const options = {
        propertyList: flags.propertyList,
        onlyValue: flags.onlyValue,
      }
      const res = await notion.retrieveDb(flags.database_id, options)
      console.dir(res, { depth: null })
    }
    // Run prompt when no flags
    if (Object.keys(flags).length === 0) {
      // Search DB
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
      const db = await prompts([
        {
          type: 'autocomplete',
          name: 'database_id',
          message: 'Select a database',
          choices: sortedDbChoices
        },
      ])
      //console.log(db.database_id)

      // Search properties of DB
      // FIXME: 対応タイプを増やす
      const selectedDb = await notion.retrieveDb(db.database_id, {})
      // console.dir(selectedDb, {depth: null})
      const propChoices = await getNotionDbOptions(selectedDb)
      // console.dir(selectedDb, {depth: null})

      // Build
      let filter = {}
      let CombineOperator = undefined
      const promptAddFilterResult = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Add filter?',
        initial: true
      })

      while (promptAddFilterResult.value) {
        // Choice the operator first time and keep using it.
        if (Object.keys(filter).length != 0 && CombineOperator == undefined) {
          const promptAndOrPropResult = await prompts({
            type: 'autocomplete',
            name: 'operator',
            message: 'select and/or',
            choices: [
              { title: 'and', value: 'and' },
              { title: 'or', value: 'or' },
            ]
          })
          // rebuild filter object with choose operator
          const tmp = filter
          CombineOperator = promptAndOrPropResult.operator
          filter = {[CombineOperator]: [tmp]}
        }

        // Select a property for filter
        const filterPropChoices = await getPromptChoices(selectedDb)
        const promptPropResult = await prompts({
          type: 'autocomplete',
          name: 'property',
          message: 'select a property for filter by',
          choices: filterPropChoices
        })

        // 選ばれたプロパティのタイプに応じて次のプロンプト情報を作成する
        // 同一DB上でプロパティ名は重複せずユニークなのでnameで指定プロパティは決定する
        // const selectedProp = propChoices.find((p) => {
        //   return p.value == promptPropResult.property
        // })
        // console.log(selectedProp)
        const selectedProp = Object.entries(selectedDb.properties)
          .find(([_, prop]) => {
            // console.log(prop)
            return prop.name == promptPropResult.property
          })
        // console.log(selectedProp2)
        if (selectedProp[1].type == undefined) {
          console.log("selectedProp.type is undefined")
          return
        }


        // Select/Input a value for filtering
        const fpp = await buildFilterPagePromptFromObj(selectedProp[1])
        const promptFilterPropResult = await prompts(fpp)
        let filterValue = promptFilterPropResult.value
        switch (selectedProp[1].type) {
          case 'multi_select':
          case 'relation':
            // Extract a value from multi-select result
            filterValue = promptFilterPropResult.value[0]
        }
        const filterObj = await buildDatabaseQueryFilter(
          selectedProp[1].name,
          selectedProp[1].type,
          filterValue
        )
        if (filterObj == null) {
          console.log("Error buildFilter")
          return
        }
        if (Object.keys(filter).length == 0) {
          filter = filterObj
        } else {
          filter[CombineOperator].push(filterObj)
        }

        const promptConfirmAddFilterFinishResult = await prompts({
          type: 'confirm',
          name: 'value',
          message: 'Finish add filter?',
          initial: true
        })
        if (promptConfirmAddFilterFinishResult.value) {
          break
        }
      }
      console.log("Filter:")
      console.log(filter)
      console.log("")

      const pages = await notion.queryDb(db.database_id, JSON.stringify(filter))
      if (pages.length == 0) {
        console.log("No pages found")
        return
      }

      // Get update target page IDs
      console.log("Filtered Pages:")
      const updatePageIDs = []
      for (const page of pages) {
        updatePageIDs.push(page.id)
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

      const promptConfirmUpdatePropResult = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Update property?',
        initial: true
      })
      if (!promptConfirmUpdatePropResult.value) {
        return
      }

      // Select a update property
      const promptSelectUpdatePropResult = await prompts([
        {
          type: 'autocomplete',
          name: 'property',
          message: 'select a update property',
          choices: propChoices
        },
      ])
      // console.log(promptSelectUpdatePropResult)
      const updateTargetProp = propChoices.find((p) => {
        return p.value == promptSelectUpdatePropResult.property
      })
      if (updateTargetProp?.type == undefined) {
        console.log(`${updateTargetProp} is not found`)
        return
      }

      const upp = await buildFilterPagePrompt(updateTargetProp)
      const promptUpdatePropValueResult = await prompts(upp)

      const updateData = await buildPagePropUpdateData(
        updateTargetProp.value,
        updateTargetProp.type,
        promptUpdatePropValueResult.value
      )
      console.log("Start Update Pages")
      for (const pageId of updatePageIDs) {
        console.log(`page_id: ${pageId}, updateData:`)
        console.dir(updateData, {depth: null})
        await notion.updatePage(pageId, updateData)
      }
      console.log("End Update Pages")
    }
  }
}

