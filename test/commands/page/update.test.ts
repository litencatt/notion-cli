import {expect, test} from '@oclif/test'

const apiMock = (response: any) => {
  return test.nock('https://api.notion.com', api => api
    .patch('/v1/pages/dummy-page-id')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})
}

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
      title: [{
        type: 'text',
        text: {
          content: 'dummy page title',
        },
        plain_text: 'dummy page title',
      }],
    }
  },
  url: 'https://www.notion.so/dummy-page-id',
}

const responseOnPageWithEmptyTitle = {
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
      title: [{
        type: 'text',
        text: {
          content: 'dummy page title',
        },
        plain_text: 'dummy page title',
      }],
    }
  },
  url: 'https://www.notion.so/dummy-page-id',
}

const responseOnDbWithEmptyTitle = {
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

describe('page:update', () => {
  describe('with page_id on a page flags', () => {
    apiMock(responseOnPage)
    .command([
      'page:update',
      '--no-truncate',
      'dummy-page-id'
    ])
    .it('shows retrieve page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --raw flags', () => {
      apiMock(responseOnPage)
      .command([
        'page:update',
        'dummy-page-id',
        '--raw'
      ])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("object\": \"page")
        expect(ctx.stdout).to.contain("id\": \"dummy-page-id")
        expect(ctx.stdout).to.contain("url\": \"https://www.notion.so/dummy-page-id")
      })
    })

    describe('response title is [', () => {
      apiMock(responseOnPageWithEmptyTitle)
      .command([
        'page:update',
        '--no-truncate',
        'dummy-page-id'
      ])
      .it('shows retrieve page result table', ctx => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(/Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
      })
    })
  })

  describe('with page_id on a db flags', () => {
    apiMock(responseOnDb)
    .command([
      'page:update',
      '--no-truncate',
      'dummy-page-id'
    ])
    .it('shows retrieve page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --raw flags', () => {
      apiMock(responseOnDb)
      .command([
        'page:update',
        'dummy-page-id',
        '--raw'
      ])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("object\": \"page")
        expect(ctx.stdout).to.contain("id\": \"dummy-page-id")
        expect(ctx.stdout).to.contain("url\": \"https://www.notion.so/dummy-page-id")
      })
    })

    describe('response title is []', () => {
      apiMock(responseOnDbWithEmptyTitle)
      .command([
        'page:update',
        '--no-truncate',
        'dummy-page-id'
      ])
      .it('shows retrieve page result table', ctx => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(/Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
      })
    })
  })
})
