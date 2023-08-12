import {expect, test} from '@oclif/test'

describe('db:query', () => {
  const response = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: 'dummy-database-id',
        title: [
          {
            type: 'text',
            text: {
              content: 'dummy database title',
            }
          }
        ],
      }
    ],
  }

  test
  .nock('https://api.notion.com', api => api
    .post('/v1/databases/dummy-database-id/query')
    .reply(200, response)
  )
  .stdout()
  .command(['db:query', 'dummy-database-id', '-r', '{"property":"title","text":{"equals":"dummy database title"}}'])
  .it('shows queried database object when success with title flags', ctx => {
    expect(ctx.stdout).to.contain("dummy-database-id")
    expect(ctx.stdout).to.contain("dummy database title")
  })
})
