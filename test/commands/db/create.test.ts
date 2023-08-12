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
        }
      }
    ],
  }

  test
  .nock('https://api.notion.com', api => api
    .post('/v1/databases')
    .reply(200, response)
  )
  .stdout()
  .command(['db:create', 'dummy-page-id', '-t', 'dummy database title'])
  .it('shows created database object when success with title flags', ctx => {
    expect(ctx.stdout).to.contain("dummy-database-id")
    expect(ctx.stdout).to.contain("dummy database title")
  })
})
