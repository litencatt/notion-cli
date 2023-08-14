import {expect, test} from '@oclif/test'

describe('db:update', () => {
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

  const apiMock = test.nock('https://api.notion.com', api => api
    .patch('/v1/databases/dummy-database-id')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with no flags', () => {
    apiMock
    .command(['db:update', '--no-truncate', '-t dummy database title','dummy-database-id'])
    .it('shows updated result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy database title.*database.*dummy-database-id.*https:\/\/www\.notion\.so\/dummy-database-id/)
    })
  })

  describe('with --row flags', () => {
    apiMock
    .command(['db:update', '-t', 'dummy database title', 'dummy-database-id', '--row'])
    .exit(0)
    .it('shows updated database object', ctx => {
      expect(ctx.stdout).to.contain("dummy-database-id")
      expect(ctx.stdout).to.contain("dummy database title")
    })
  })
})
