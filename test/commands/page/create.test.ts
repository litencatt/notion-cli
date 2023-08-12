import {expect, test} from '@oclif/test'

describe('page:create', () => {
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
    .post('/v1/pages')
    .reply(200, response)
  )
  .stdout()
  .command(['page:create', 'dummy-database-id'])
  .it('shows created page object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'page")
    expect(ctx.stdout).to.contain("id: \'dummy-page-id")
    expect(ctx.stdout).to.contain("database_id: \'dummy-database-id")
  })
})
