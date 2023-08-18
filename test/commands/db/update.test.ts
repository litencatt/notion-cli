import {expect, test} from '@oclif/test'

const apiMock = (response: any) => {
  return test.nock('https://api.notion.com', api => api
    .patch('/v1/databases/dummy-database-id')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})
}

const response = {
  object: 'database',
  id: 'dummy-database-id',
  title: [
    {
      type: 'text',
      text: {
        content: 'dummy database title',
      },
      plain_text: 'dummy database title',
    }
  ],
  url: 'https://www.notion.so/dummy-database-id',
}

const titleEmptyResponse = {
  object: 'database',
  id: 'dummy-database-id',
  title: [],
  url: 'https://www.notion.so/dummy-database-id',
}

describe('db:update', () => {
  describe('with no flags', () => {
    apiMock(response)
    .command([
      'db:update',
      '--no-truncate',
      '-t dummy database title',
      'dummy-database-id'
    ])
    .it('shows updated result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy database title.*database.*dummy-database-id.*https:\/\/www\.notion\.so\/dummy-database-id/)
    })
  })

  describe('with --raw flags', () => {
    apiMock(response)
    .command([
      'db:update',
      '-t', 'dummy database title',
      'dummy-database-id',
      '--raw'
    ])
    .exit(0)
    .it('shows updated database object', ctx => {
      expect(ctx.stdout).to.contain("dummy-database-id")
      expect(ctx.stdout).to.contain("dummy database title")
    })
  })

  describe('response title is []', () => {
    apiMock(titleEmptyResponse)
    .command([
      'db:update',
      '--no-truncate',
      '-t dummy database title',
      'dummy-database-id'
    ])
    .it('shows updated result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/Untitled.*database.*dummy-database-id.*https:\/\/www\.notion\.so\/dummy-database-id/)
    })
  })
})
