import {expect, test} from '@oclif/test'

describe('page:create', () => {
  const createOnPageResponse = {
    object: 'page',
    id: 'dummy-page-id',
    parent: {
      type: 'page_id',
      page_id: 'dummy-parent-page-id',
    },
    archived: false,
    properties: {
      title: {
        id: 'title',
        type: 'title',
        title: [],
      }
    },
    url: 'https://www.notion.so/dummy-page-id',
  }

  const createOnDbResponse = {
    object: 'page',
    id: 'dummy-page-id',
    parent: {
      type: 'database_id',
      database_id: 'dummy-parent-database-id',
    },
    archived: false,
    properties: {
      title: {
        id: 'title',
        type: 'title',
        title: [],
      }
    },
    url: 'https://www.notion.so/dummy-page-id',
  }

  const apiMockPage = test.nock('https://api.notion.com', api => api
    .post('/v1/pages')
    .reply(200, createOnPageResponse)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with parent_page_id flags', () => {
    apiMockPage
    .command(['page:create', '--no-truncate', '-p','dummy-parent-page-id'])
    .it('shows create page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/undefined.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --row flags', () => {
      apiMockPage
      .command(['page:create', '-p', 'dummy-parent-page-id', '--row'])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("dummy-parent-page-id")
      })
    })
  })

  const apiMockDb = test.nock('https://api.notion.com', api => api
    .post('/v1/pages')
    .reply(200, createOnDbResponse)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with parent_db_id flags', () => {
    apiMockDb
    .command(['page:create', '--no-truncate', '-p','dummy-parent-database-id'])
    .it('shows create page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/undefined.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --row flags', () => {
      apiMockDb
      .command(['page:create', '-p', 'dummy-parent-database-id', '--row'])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("dummy-parent-database-id")
      })
    })
  })
})
