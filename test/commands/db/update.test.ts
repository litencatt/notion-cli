import {expect, test} from '@oclif/test'

describe('db:update', () => {
  const response = {
    object: 'database',
    id: 'dummy-database-id',
    title: [
      {
        type: 'text',
        text: {
          content: 'new database title',
        }
      }
    ],
  }

  test
  .nock('https://api.notion.com', api => api
    .patch('/v1/databases/dummy-database-id')
    .reply(200, response)
  )
  .stdout()
  .command(['db:update', 'dummy-database-id', '-t', 'new database title'])
  .it('shows updated database object when success with title flags', ctx => {
    expect(ctx.stdout).to.contain("dummy-database-id")
    expect(ctx.stdout).to.contain("new database title")
  })
})
