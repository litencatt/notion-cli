import { Client } from '@notionhq/client'
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetDatabaseResponse,
  CreateDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const queryDb = async (
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

// TODO
// - Support title
// - Support properties
export const createDb = async (
  pageId: string
): Promise<CreateDatabaseResponse> => {
  return await notion.databases.create({
    parent: {
      type: 'page_id',
      page_id: pageId,
    },
    title: [
      {
        type: 'text',
        text: {
          content: `DB-${Date.now()}`,
        },
      },
    ],
    properties: {
      Name: {
        title: {},
      },
    },
  })
}

// TODO
// - Support title
// - Support properties
export const updateDb = async (
  databaseId: string
): Promise<GetDatabaseResponse> => {
  return await notion.databases.update({
    database_id: databaseId,
    properties: {
      Tags: {
        multi_select: {
          options: [
            {
              name: 'aaa',
            },
          ],
        },
      },
    },
  })
}

export const retrieveDb = async (
  databaseId: string
): Promise<GetDatabaseResponse> => {
  return await notion.databases.retrieve({ database_id: databaseId })
}

export const retreivePage = async (pageId: string) => {
  const res = notion.pages.retrieve({
    page_id: pageId,
  })
  return res
}

export const createPage = async (databaseId: string) => {
  const res = notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: 'foo',
            },
          },
        ],
      },
    },
  })
  return res
}

export const updatePage = async (pageId: string) => {
  const res = notion.pages.update({
    page_id: pageId,
    properties: {
      Name: {
        title: [
          {
            text: {
              content: 'bar',
            },
          },
        ],
      },
    },
  })
  return res
}

export const retreiveBlock = async (blockId: string) => {
  const res = notion.blocks.retrieve({
    block_id: blockId,
  })
  return res
}

export const updateBlock = async (blockId: string) => {
  const res = notion.blocks.update({
    block_id: blockId,
  })
  return res
}

export const retreiveBlockChildren = async (blockId: string) => {
  const res = notion.blocks.children.list({
    block_id: blockId,
  })
  return res
}

export const appendBlockChildren = async (blockId: string) => {
  const res = notion.blocks.children.append({
    block_id: blockId,
    children: [],
  })
  return res
}

export const deleteBlock = async (blockId: string) => {
  const res = notion.blocks.delete({
    block_id: blockId,
  })
  return res
}

export const retreiveUser = async (userId: string) => {
  return await notion.users.retrieve({
    user_id: userId,
  })
}

export const listUser = async () => {
  return await notion.users.list({})
}
