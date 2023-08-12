import {expect, test} from '@oclif/test'

describe('page:update', () => {
  const response = {
    object: 'page',
    id: 'dummy-page-id',
    parent: {
      type: 'database_id',
      database_id: 'dummy-database-id',
    },
    archived: false,
    properties: {
      Name: {
        id: 'title',
        type: 'title',
        title: [],
      }
    },
  }

  test
  .nock('https://api.notion.com', api => api
    .patch('/v1/pages/dummy-page-id')
    .reply(200, response)
  )
  .stdout()
  .command(['page:update', 'dummy-page-id'])
  .it('shows updated page object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'page")
    expect(ctx.stdout).to.contain("id: \'dummy-page-id")
    expect(ctx.stdout).to.contain("database_id: \'dummy-database-id")
  })
})
