import {expect, test} from '@oclif/test'

describe('db:retrieve', () => {
  const retrieveResponse = {
    object: 'database',
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

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/databases/dummy-database-id')
    .reply(200, retrieveResponse)
  )
  .stdout()
  .command(['db:retrieve', 'dummy-database-id'])
  .it('shows a database object when success', ctx => {
    expect(ctx.stdout).to.contain("dummy-database-id")
    expect(ctx.stdout).to.contain("dummy database title")
  })
})
