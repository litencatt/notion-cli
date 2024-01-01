import { expect, test } from '@oclif/test'

const apiMock = (response: any) => {
  return test
    .nock('https://api.notion.com', (api) =>
      api.get('/v1/pages/dummy-page-id').reply(200, response)
    )
    .stdout({ print: process.env.TEST_DEBUG ? true : false })
}

const retrieveOnPageResponse = {
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
  url: 'https://www.notion.so/dummy-page-id',
}

const retrieveOnPageResponseWithEmptyTitle = {
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
    },
  },
  url: 'https://www.notion.so/dummy-page-id',
}

const retrieveOnDbResponse = {
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
  url: 'https://www.notion.so/dummy-page-id',
}

const retrieveOnDbResponseWIthEmtyTitle = {
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
    },
  },
  url: 'https://www.notion.so/dummy-page-id',
}

describe('page:retrieve', () => {
  describe('with page_id on a page flags', () => {
    apiMock(retrieveOnPageResponse)
      .command(['page:retrieve', '--no-truncate', 'dummy-page-id'])
      .it('shows retrieve page result table', (ctx) => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(
          /dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/
        )
      })

    describe('with --raw flags', () => {
      apiMock(retrieveOnPageResponse)
        .command(['page:retrieve', 'dummy-page-id', '--raw'])
        .exit(0)
        .it('shows a page object', (ctx) => {
          expect(ctx.stdout).to.contain('object": "page')
          expect(ctx.stdout).to.contain('id": "dummy-page-id')
          expect(ctx.stdout).to.contain('url": "https://www.notion.so/dummy-page-id')
        })
    })

    describe('response title is []', () => {
      apiMock(retrieveOnPageResponseWithEmptyTitle)
        .command(['page:retrieve', '--no-truncate', 'dummy-page-id'])
        .it('shows retrieve page result table', (ctx) => {
          expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
          expect(ctx.stdout).to.match(
            /Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/
          )
        })
    })
  })

  describe('with page_id on a db flags', () => {
    apiMock(retrieveOnDbResponse)
      .command(['page:retrieve', '--no-truncate', 'dummy-page-id'])
      .it('shows retrieve page result table', (ctx) => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(
          /dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/
        )
      })

    describe('with --raw flags', () => {
      apiMock(retrieveOnDbResponse)
        .command(['page:retrieve', 'dummy-page-id', '--raw'])
        .exit(0)
        .it('shows a page object', (ctx) => {
          expect(ctx.stdout).to.contain('object": "page')
          expect(ctx.stdout).to.contain('id": "dummy-page-id')
          expect(ctx.stdout).to.contain('url": "https://www.notion.so/dummy-page-id')
        })
    })

    describe('response title is [', () => {
      apiMock(retrieveOnDbResponseWIthEmtyTitle)
        .command(['page:retrieve', '--no-truncate', 'dummy-page-id'])
        .it('shows retrieve page result table', (ctx) => {
          expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
          expect(ctx.stdout).to.match(
            /Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/
          )
        })
    })
  })
})
