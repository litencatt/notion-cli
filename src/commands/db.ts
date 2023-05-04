import { Command, Flags } from '@oclif/core'
const  prompts  = require('prompts')

import { queryDb, createDb, updateDb, retrieveDb, searchDb, updatePage } from '../notion'
import { PromptChoice } from '../interface'
import { buildFilterPagePrompt, buildFilter, buildUpdateData } from '../helper'
import { isFullDatabase } from '@notionhq/client'

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
      const res = await queryDb(flags.database_id, flags.filter as string)
      console.dir(res, { depth: null })
    }
    // Create a database
    if (flags.create && flags.page_id) {
      const res = await createDb(flags.page_id)
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
      const res = await retrieveDb(flags.database_id, options)
      console.dir(res, { depth: null })
    }
    // Run prompt when no flags
    if (Object.keys(flags).length === 0) {
      // Search DB
      const dbs = await searchDb()
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
      const propChoices: PromptChoice[] = []
      const selectedDb = await retrieveDb(db.database_id, {})
      console.dir(selectedDb, {depth: null})
      Object.entries(selectedDb.properties).forEach(([_, prop]) => {
        const options = []
        switch (prop.type) {
          case 'select':
            for (const opt of prop.select.options) {
              options.push({
                id: opt.id,
                name: opt.name
              })
            }
            break
          case 'multi_select':
            for (const opt of prop.multi_select.options) {
              options.push({
                id: opt.id,
                name: opt.name
              })
            }
            break
        }
        propChoices.push({
          title: prop.name,
          value: prop.name,
          type: prop.type,
          options: options
        })
      })
      console.dir(propChoices, {depth: null})
      // Select a property
      const promptPropertyResult = await prompts([
        {
          type: 'autocomplete',
          name: 'property',
          message: 'select a property',
          choices: propChoices
        },
      ])
      // this.log(promptPropertyResult)
      const selectedProperty = propChoices.find((p) => {
        return p.value == promptPropertyResult.property
      })
      if (selectedProperty?.type == undefined) {
        console.log("selectedProperty.type is undefined")
        return
      }

      // Select/Input a value for filtering
      const fpp = await buildFilterPagePrompt(selectedProperty)
      //console.log(prompt)
      const promptFilterPropResult = await prompts(fpp)
      //console.log(selectedPropValue)

      // Build Filter and Filtering
      const filter = await buildFilter(
        selectedProperty.value,
        selectedProperty.type,
        promptFilterPropResult.value
      )
      console.log(filter)
      if (filter == null) {
        console.log("Error buildFilter")
        return
      }
      const pages = await queryDb(db.database_id, filter)
      if (pages.length == 0) {
        this.log("No pages found")
        return
      }

      // Get update target page IDs
      const updatePageIDs = []
      for (const page of pages) {
        updatePageIDs.push(page.id)
        // @ts-ignore
        //console.log(page.properties.name.title[0].plain_text)
      }
      console.log(updatePageIDs)

      // Select a update property
      const selectUpdateProp = await prompts([
        {
          type: 'autocomplete',
          name: 'property',
          message: 'select a update property',
          choices: propChoices
        },
      ])
      this.log(selectUpdateProp)
      //
      const updateTargetProp = propChoices.find((p) => {
        return p.value == selectUpdateProp.property
      })
      if (updateTargetProp?.type == undefined) {
        this.log(`${updateTargetProp} is not found`)
        return
      }

      const upp = await buildFilterPagePrompt(updateTargetProp)
      const updateProp = await prompts(upp)

      const updateData = await buildUpdateData(
        updateTargetProp.value,
        updateTargetProp.type,
        updateProp.value
      )
      console.log(updateData)
      for (const pageId of updatePageIDs) {
        await updatePage(pageId, updateData)
      }
    }
  }
}

