import { expect, test } from '@oclif/test'

const apiMock = (response: any) => {
  return test
    .nock('https://api.notion.com', (api) => api.post('/v1/search').reply(200, response))
    .stdout({ print: process.env.TEST_DEBUG ? true : false })
}

const response = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: 'dummy-page-id',
      url: 'https://www.notion.so/dummy-page-id',
      properties: {
        Name: {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: 'dummy page title',
              },
              plain_text: 'dummy page title',
            },
          ],
        },
      },
    },
    {
      object: 'database',
      id: 'dummy-database-id',
      url: 'https://www.notion.so/dummy-database-id',
      title: [
        {
          type: 'text',
          text: {
            content: 'dummy database title',
          },
          plain_text: 'dummy database title',
        },
      ],
    },
  ],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
}

const titleEmptyResponse = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: 'dummy-page-id',
      url: 'https://www.notion.so/dummy-page-id',
      properties: {
        Name: {
          id: 'title',
          type: 'title',
          title: [],
        },
      },
    },
    {
      object: 'database',
      id: 'dummy-database-id',
      url: 'https://www.notion.so/dummy-database-id',
      title: [],
    },
  ],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
}

describe('search', () => {
  describe('with no flags', () => {
    apiMock(response)
      // Need --no-truncate flag to match expected stdout
      .command(['search', '--no-truncate'])
      .it('shows search result table', (ctx) => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(
          /dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/
        )
        expect(ctx.stdout).to.match(
          /dummy database title.*database.*dummy-database-id.*https:\/\/www\.notion\.so\/dummy-database-id/
        )
      })
  })

  describe('with --raw flags', () => {
    apiMock(response)
      .command(['search', '--raw'])
      .exit(0)
      .it('shows search result row json', (ctx) => {
        expect(ctx.stdout).to.contain('object": "list')
        expect(ctx.stdout).to.contain('url": "https://www.notion.so/dummy-page-id')
        expect(ctx.stdout).to.contain('url": "https://www.notion.so/dummy-database-id')
        expect(ctx.stdout).to.contain('type": "page_or_database')
      })
  })

  describe('response title is []', () => {
    apiMock(titleEmptyResponse)
      .command(['search', '--no-truncate'])
      .it('shows search result table', (ctx) => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(
          /Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/
        )
        expect(ctx.stdout).to.match(
          /Untitled.*database.*dummy-database-id.*https:\/\/www\.notion\.so\/dummy-database-id/
        )
      })
  })
})
