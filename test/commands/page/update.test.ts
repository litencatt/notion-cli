import {expect, test} from '@oclif/test'

describe('page:update', () => {
  const responseOnPage = {
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

  const responseOnDb = {
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
    .patch('/v1/pages/dummy-page-id')
    .reply(200, responseOnPage)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with page_id on a page flags', () => {
    apiMockPage
    .command([
      'page:update',
      '--no-truncate',
      'dummy-page-id'
    ])
    .it('shows retrieve page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/undefined.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --raw flags', () => {
      apiMockPage
      .command([
        'page:update',
        'dummy-page-id',
        '--raw'
      ])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("object: \'page")
        expect(ctx.stdout).to.contain("id: \'dummy-page-id")
        expect(ctx.stdout).to.contain("url: \'https://www.notion.so/dummy-page-id")
      })
    })
  })

  const apiMockDb = test.nock('https://api.notion.com', api => api
    .patch('/v1/pages/dummy-page-id')
    .reply(200, responseOnDb)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with page_id on a db flags', () => {
    apiMockDb
    .command([
      'page:update',
      '--no-truncate',
      'dummy-page-id'
    ])
    .it('shows retrieve page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/undefined.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --raw flags', () => {
      apiMockDb
      .command([
        'page:update',
        'dummy-page-id',
        '--raw'
      ])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("object: \'page")
        expect(ctx.stdout).to.contain("id: \'dummy-page-id")
        expect(ctx.stdout).to.contain("url: \'https://www.notion.so/dummy-page-id")
      })
    })
  })
})
