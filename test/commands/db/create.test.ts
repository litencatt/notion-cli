import {expect, test} from '@oclif/test'

describe('db:create', () => {
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
    .post('/v1/databases')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with no flags', () => {
    apiMock
    .command(['db:create', '--no-truncate', '-t', 'dummy database title','dummy-page-id'])
    .it('shows created result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy database title.*database.*dummy-database-id.*https:\/\/www\.notion\.so\/dummy-database-id/)
    })
  })

  describe('with --row flags', () => {
    apiMock
    .command(['db:create', 'dummy-page-id', '-t', 'dummy database title'])
    .it('shows created database object when success with title flags', ctx => {
      expect(ctx.stdout).to.contain("dummy-database-id")
      expect(ctx.stdout).to.contain("dummy database title")
    })
  })
})
