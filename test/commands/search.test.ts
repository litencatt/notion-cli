import {expect, test} from '@oclif/test'

describe('search', () => {
  const response = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: 'dummy-page-id',
      },
      {
        object: 'database',
        id: 'dummy-database-id',
      }
    ],
    next_cursor: null,
    has_more: false,
    type: 'page_or_database',
    page_or_database: {}
  }

  test
  .nock('https://api.notion.com', api => api
    .post('/v1/search')
    .reply(200, response)
  )
  .stdout()
  .command(['search'])
  .it('shows retrieved result object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'list")
    expect(ctx.stdout).to.contain("results: [")
  })
})
