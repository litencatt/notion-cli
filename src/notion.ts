import { Client, LogLevel } from '@notionhq/client'
import {
  CreateDatabaseParameters,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetDatabaseResponse,
  CreateDatabaseResponse,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { markdownToBlocks } from '@tryfabric/martian'
type BlockObjectRequest = ReturnType<typeof markdownToBlocks>[number]

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  // logLevel: LogLevel.DEBUG
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
  databaseId: string,
  options: any
): Promise<GetDatabaseResponse> => {
  const res = await notion.databases.retrieve({ database_id: databaseId })
  return retrieveResponse(res, options)
}

// Now suppots res.properties only.
const retrieveResponse = (res: GetDatabaseResponse, options: any) => {
  if (!options.propertyList) {
    return res
  }

  const showProperties = options.propertyList.split(',')
  const output: any = []
  Object.entries(res.properties).forEach(([_, prop]) => {
    if (!showProperties.includes(prop.name)) {
      return
    }
    const prefix = options.onlyValue ? '' : `${prop.name}: `
    let o = ''
    if (prop.type == 'title') {
      o = prop.name
    } else if (prop.type == 'select') {
      o = prop.select.options.map((o) => o.name).join(',')
    } else if (prop.type == 'multi_select') {
      o = prop.multi_select.options.map((o) => o.name).join(',')
    }
    output.push(`${prefix}${o}`)
  })
  return output.join('\n')
}

export const retrievePage = async (pageId: string) => {
  const res = notion.pages.retrieve({
    page_id: pageId,
  })
  return res
}

export const retrievePageProperty = async (pageId: string, propId: string) => {
  const res = notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: propId,
  })
  return res
}

export const createPage = async (
  databaseId: string,
  title: string,
  blocks: BlockObjectRequest[]
) => {
  const props = {
    Name: {
      title: [{ text: { content: title } }],
    },
  }
  const res = notion.pages.create({
    parent: { database_id: databaseId },
    properties: props,
    // @ts-ignore
    children: blocks,
  })
  return res
}

export const updatePageProps = async (
  pageId: string,
  properties: any
) => {
  const res = notion.pages.update({
    page_id: pageId,
    properties: properties,
  })
  return res
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

export const archivePage = async (
  pageId: string
) => {
  notion.pages.update({
    page_id: pageId,
    archived: true,
  });
};

export const retrieveBlock = async (blockId: string) => {
  const res = notion.blocks.retrieve({
    block_id: blockId,
  })
  return res
}

// TODO
// - support {type} params
// - support archived params
export const updateBlock = async (blockId: string) => {
  const res = notion.blocks.update({
    block_id: blockId,
  })
  return res
}

export const retrieveBlockChildren = async (blockId: string) => {
  const res = notion.blocks.children.list({
    block_id: blockId,
  })
  return res
}

// TODO
// - support children params
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
