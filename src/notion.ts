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
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: process.env.DEBUG ? LogLevel.DEBUG : null,
})

export const queryDb = async (
  databaseId: string,
  filter?: object | undefined
): Promise<QueryDatabaseResponse['results']> => {
  const f = filter as QueryDatabaseParameters['filter']
  const pages = []
  let cursor: string | undefined = undefined
  while (true) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      filter: f,
      start_cursor: cursor
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
  return await notion.databases.create(dbProps)
}

export const updateDb = async (
  dbProps: UpdateDatabaseParameters
): Promise<GetDatabaseResponse> => {
  return await notion.databases.update(dbProps)
}

export const retrieveDb = async (
  databaseId: string,
): Promise<GetDatabaseResponse> => {
  return await notion.databases.retrieve({ database_id: databaseId })
}

export const retrievePage = async (pageProp: GetPageParameters) => {
  return notion.pages.retrieve(pageProp)
}

// TODO: support page_size, start_cursor
export const retrievePageProperty = async (pageId: string, propId: string) => {
  const res = notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: propId,
  })
  return res
}

export const createPage = async (
  pageProps: CreatePageParameters,
) => {
  return notion.pages.create(pageProps)
}

export const updatePageProps = async (
  pageParams: UpdatePageParameters,
) => {
  return notion.pages.update(pageParams)
}

// To keep the same page URL,
// remove all blocks in the page and add new blocks
export const updatePage = async (
  pageId: string,
  blocks: BlockObjectRequest[]
) => {
  const blks = await notion.blocks.children.list({
    block_id: pageId,
  });
  for (const blk of blks.results) {
    await notion.blocks.delete({
      block_id: blk.id,
    });
  }

  const res = await notion.blocks.children.append({
    block_id: pageId,
    // @ts-ignore
    children: blocks,
  });

  return res
};

export const retrieveBlock = async (blockId: string) => {
  const res = notion.blocks.retrieve({
    block_id: blockId,
  })
  return res
}

export const updateBlock = async (params: UpdateBlockParameters) => {
  return notion.blocks.update(params)
}

export const retrieveBlockChildren = async (blockId: string) => {
  const res = notion.blocks.children.list({
    block_id: blockId,
  })
  return res
}

export const appendBlockChildren = async (
  params: AppendBlockChildrenParameters
) => {
  return notion.blocks.children.append(params)
}

export const deleteBlock = async (blockId: string) => {
  const res = notion.blocks.delete({
    block_id: blockId,
  })
  return res
}

export const retrieveUser = async (userId: string) => {
  return await notion.users.retrieve({
    user_id: userId,
  })
}

export const listUser = async () => {
  return await notion.users.list({})
}

export const botUser = async () => {
  return await notion.users.me({})
}

export const searchDb = async () => {
  const { results } = await notion.search({
    filter: {
      value: 'database',
      property: 'object'
    }
  })
  return results
}
