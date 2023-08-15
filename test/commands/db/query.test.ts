import {expect, test} from '@oclif/test'

describe('db:query', () => {
  const response = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: 'dummy-page-id',
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
    ],
  }

  const apiMock = test.nock('https://api.notion.com', api => api
    .post('/v1/databases/dummy-database-id/query')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with raw filter flags', () => {
    apiMock
    .command([
      'db:query',
      'dummy-database-id',
      '-a', '{"and": []}',
    ])
    .it('shows query result table', ctx => {
      expect(ctx.stdout).to.match(/Title.*Object.*Id.*Url/)
      expect(ctx.stdout).to.match(/dummy page title.*page.*dummy-page-id.*https:\/\/www\.notion\.so\/dummy-page-id/)
    })
  })

  describe('with --raw flags', () => {
    apiMock
    .command([
      'db:query',
      'dummy-database-id',
      '-a', '{"and": []}',
      '--raw',
    ])
    .exit(0)
    .it('shows query result page objects', ctx => {
      expect(ctx.stdout).to.contain("dummy-page-id")
      expect(ctx.stdout).to.contain("dummy page title")
    })
  })
})
