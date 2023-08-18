import {expect, test} from '@oclif/test'

const apiMock = (response: any) => {
  return test.nock('https://api.notion.com', api => api
    .post('/v1/pages')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})
}

const createOnPageResponse = {
  object: 'page',
  id: 'dummy-page-id',
  parent: {
    type: 'page_id',
    page_id: 'dummy-parent-page-id',
  },
  archived: false,
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
        }
      ]
    }
  },
  url: 'https://www.notion.so/dummy-page-id',
}

const createOnPageResponseWithEmptyTitle = {
  object: 'page',
  id: 'dummy-page-id',
  parent: {
    type: 'page_id',
    page_id: 'dummy-parent-page-id',
  },
  archived: false,
  properties: {
    Name: {
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
        }
      ],
    }
  },
  url: 'https://www.notion.so/dummy-page-id',
}

const createOnDbResponseWithEmptyTitle = {
  object: 'page',
  id: 'dummy-page-id',
  parent: {
    type: 'database_id',
    database_id: 'dummy-parent-database-id',
  },
  archived: false,
  properties: {
    Name: {
      id: 'title',
      type: 'title',
      title: [],
    }
  },
  url: 'https://www.notion.so/dummy-page-id',
}

describe('page:create', () => {
  describe('with parent_page_id flags', () => {
    apiMock(createOnPageResponse)
    .command([
      'page:create',
      '--no-truncate',
      '-p','dummy-parent-page-id'
    ])
    .it('shows create page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --raw flags', () => {
      apiMock(createOnPageResponse)
      .command([
        'page:create',
        '-p', 'dummy-parent-page-id',
        '--raw'
      ])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("dummy-parent-page-id")
      })
    })

    describe('response title is []', () => {
      apiMock(createOnPageResponseWithEmptyTitle)
      .command([
        'page:create',
        '--no-truncate',
        '-p','dummy-parent-page-id'
      ])
      .it('shows create page result table', ctx => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(/Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
      })
    })
  })

  describe('with parent_db_id flags', () => {
    apiMock(createOnDbResponse)
    .command([
      'page:create',
      '--no-truncate',
      '-p','dummy-parent-database-id'
    ])
    .it('shows create page result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })

    describe('with --raw flags', () => {
      apiMock(createOnDbResponse)
      .command([
        'page:create',
        '-p', 'dummy-parent-database-id',
        '--raw'
      ])
      .exit(0)
      .it('shows a page object', ctx => {
        expect(ctx.stdout).to.contain("dummy-parent-database-id")
      })
    })

    describe('response title is []', () => {
      apiMock(createOnDbResponseWithEmptyTitle)
      .command([
        'page:create',
        '--no-truncate',
        '-p','dummy-parent-database-id'
      ])
      .it('shows create page result table', ctx => {
        expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
        expect(ctx.stdout).to.match(/Untitled.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
      })
    })
  })
})
