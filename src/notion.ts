import { Client, LogLevel } from '@notionhq/client'
import {
  CreateDatabaseParameters,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetDatabaseResponse,
  CreateDatabaseResponse,
  UpdateDatabaseParameters,
  GetPageParameters,
  CreatePageParameters,
  BlockObjectRequest,
  UpdatePageParameters,
  AppendBlockChildrenParameters,
  UpdateBlockParameters,
  SearchParameters,
} from '@notionhq/client/build/src/api-endpoints'

export const client = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: process.env.DEBUG ? LogLevel.DEBUG : null,
})

export const fetchAllPagesInDB = async (
  databaseId: string,
  filter?: object | undefined
): Promise<QueryDatabaseResponse['results']> => {
  const f = filter as QueryDatabaseParameters['filter']
  const pages = []
  let cursor: string | undefined = undefined
  while (true) {
    const { results, next_cursor } = await client.databases.query({
      database_id: databaseId,
      filter: f,
      start_cursor: cursor,
    })
    pages.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }

  return pages
}

export const createDb = async (
  dbProps: CreateDatabaseParameters
): Promise<CreateDatabaseResponse> => {
  return await client.databases.create(dbProps)
}

export const updateDb = async (dbProps: UpdateDatabaseParameters): Promise<GetDatabaseResponse> => {
  return await client.databases.update(dbProps)
}

export const retrieveDb = async (databaseId: string): Promise<GetDatabaseResponse> => {
  return await client.databases.retrieve({ database_id: databaseId })
}

export const retrievePage = async (pageProp: GetPageParameters) => {
  return client.pages.retrieve(pageProp)
}

// TODO: support page_size, start_cursor
export const retrievePageProperty = async (pageId: string, propId: string) => {
  const res = client.pages.properties.retrieve({
    page_id: pageId,
    property_id: propId,
  })
  return res
}

export const createPage = async (pageProps: CreatePageParameters) => {
  return client.pages.create(pageProps)
}

export const updatePageProps = async (pageParams: UpdatePageParameters) => {
  return client.pages.update(pageParams)
}

// To keep the same page URL,
// remove all blocks in the page and add new blocks
export const updatePage = async (pageId: string, blocks: BlockObjectRequest[]) => {
  const blks = await client.blocks.children.list({
    block_id: pageId,
  })
  for (const blk of blks.results) {
    await client.blocks.delete({
      block_id: blk.id,
    })
  }

  const res = await client.blocks.children.append({
    block_id: pageId,
    // @ts-ignore
    children: blocks,
  })

  return res
}

export const retrieveBlock = async (blockId: string) => {
  const res = client.blocks.retrieve({
    block_id: blockId,
  })
  return res
}

export const updateBlock = async (params: UpdateBlockParameters) => {
  return client.blocks.update(params)
}

export const retrieveBlockChildren = async (blockId: string) => {
  const res = client.blocks.children.list({
    block_id: blockId,
  })
  return res
}

export const appendBlockChildren = async (params: AppendBlockChildrenParameters) => {
  return client.blocks.children.append(params)
}

export const deleteBlock = async (blockId: string) => {
  const res = client.blocks.delete({
    block_id: blockId,
  })
  return res
}

export const retrieveUser = async (userId: string) => {
  return await client.users.retrieve({
    user_id: userId,
  })
}

export const listUser = async () => {
  return await client.users.list({})
}

export const botUser = async () => {
  return await client.users.me({})
}

export const searchDb = async () => {
  const { results } = await client.search({
    filter: {
      value: 'database',
      property: 'object',
    },
  })
  return results
}

export const search = async (params: SearchParameters) => {
  return await client.search(params)
}
