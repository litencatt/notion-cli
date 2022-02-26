import { Client } from '@notionhq/client'
import {
  PropertyValueTitle,
  PropertyValueSelect,
  PropertyValueMultiSelect,
  PropertyValueRichText,
} from '@notion-stuff/v4-types'
import { ParentPage, PropetyTypeInfo } from './interface'
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getPlainTextFirst = (prop: PropertyValueRichText) => {
  return prop.rich_text.map((e) => e.plain_text)[0]
}

const buildFilter = (
  filter: string | null
): QueryDatabaseParameters['filter'] => {
  let f: QueryDatabaseParameters['filter'] = {
    and: [],
    or: [],
  }
  try {
    if (filter) {
      f = JSON.parse(filter)
    }
  } catch (e) {
    console.log(e)
  }
  return f
}

export const query = async (
  databaseId: string,
  filter: string | null
): Promise<QueryDatabaseResponse['results'][]> => {
  const resArr = []
  const f = buildFilter(filter)
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: f,
  })
  resArr.push(res.results)

  // fetch all pages
  let hasMore = res.has_more
  let nextCursor = res.next_cursor
  while (true) {
    if (!hasMore || nextCursor == null) {
      break
    }
    const tmp = await notion.databases.query({
      database_id: databaseId,
      filter: f,
      start_cursor: nextCursor,
    })
    hasMore = tmp.has_more
    nextCursor = tmp.next_cursor
    resArr.push(tmp.results)
  }
  return resArr
}

export const getParentPages = async (
  databaseId: string,
  relationKeys: string
): Promise<ParentPage[]> => {
  const pages: ParentPage[] = []
  const propertyNames = relationKeys.split(',')
  const results = await query(databaseId, null)
  results.map((result) => {
    result.map((page) => {
      const tmp: ParentPage = {
        page_id: page.id,
        relation_keys: [],
      }
      Object.entries(page.properties).forEach(([name, property]) => {
        if (!propertyNames.includes(name)) {
          return
        }
        if (property.type === 'select') {
          const sProp = property as PropertyValueSelect
          // multi-select but supports single select
          const val = sProp.select?.name || ''
          tmp.relation_keys.push({ property: name, value: val })
        } else if (property.type === 'multi_select') {
          const msProp = property as PropertyValueMultiSelect
          // multi-select but supports single select
          const val = msProp.multi_select.map((e) => e.name)[0]
          tmp.relation_keys.push({ property: name, value: val })
        } else if (property.type === 'title') {
          const tProp = property as PropertyValueTitle
          const val = tProp.title.map((t) => t.plain_text)[0]
          tmp.relation_keys.push({ property: name, value: val })
        }
      })
      pages.push(tmp)
    })
  })
  return pages
}

export const getDbProps = async (
  databaseId: string,
  relationKeys: string[]
): Promise<GetDatabaseResponse['properties'][]> => {
  const db = await retrieve(databaseId)
  const props: any = []
  Object.entries(db.properties).forEach(([key, property]) => {
    if (relationKeys.includes(key)) {
      props.push(property)
    }
  })
  return props
}

export const retrieve = async (
  databaseId: string
): Promise<GetDatabaseResponse> => {
  return await notion.databases.retrieve({ database_id: databaseId })
}

export const buildFilterConditions = (
  info: PropetyTypeInfo[]
): Promise<any[]> => {
  const filterCondition: any = []
  info.map((i) => {
    if (i.value == undefined) {
      return
    }
    filterCondition.push(getTypeFilter(i))
  })
  return filterCondition
}

export const getTypeFilter = (i: PropetyTypeInfo): any => {
  if (
    [
      'title',
      'rich_text',
      'url',
      'email',
      'phone_number',
      'number',
      'checkbox',
      'select',
      'date',
      'created_time',
      'last_edited_time',
    ].includes(i.type)
  ) {
    return {
      property: i.property,
      [i.type]: { equals: i.value },
    }
  } else if (
    [
      'multi_select',
      'people',
      'created_by',
      'last_edited_by',
      'relation',
    ].includes(i.type)
  ) {
    return {
      property: i.property,
      [i.type]: { contains: i.value },
    }
  }
  return null
}

export const searchDbPageIds = async (
  databaseId: string,
  filter: string
): Promise<string[]> => {
  const results = await query(databaseId, filter)
  const pageIds: string[] = []
  results.map((result) => {
    result.map((page) => {
      pageIds.push(page.id)
    })
  })

  return pageIds
}

export const createRelationProperty = async (
  databaseId: string,
  relateToDatabaseId: string,
  updatePropertyName: string
) => {
  await notion.databases.update({
    database_id: databaseId,
    properties: {
      [updatePropertyName]: {
        type: 'relation',
        relation: {
          database_id: relateToDatabaseId,
        },
      },
    },
  })
}

export const updateRelation = async (
  parentId: string,
  childIds: any[],
  updatePropertyName: string
) => {
  await notion.pages.update({
    page_id: parentId,
    properties: {
      [updatePropertyName]: {
        type: 'relation',
        relation: childIds,
      },
    },
  })
}
