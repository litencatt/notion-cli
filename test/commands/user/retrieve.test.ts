import {expect, test} from '@oclif/test'

describe('user:retrieve', () => {
  const response = {
    object: 'user',
    id: 'dummy-user-id',
    type: 'person',
    person: {
      email: 'dummy-user-email',
    },
    name: 'dummy-user-name',
    avatar_url: 'dummy-user-avatar-url',
  }

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/users/dummy-user-id')
    .reply(200, response)
  )
  .stdout()
  .command(['user:retrieve', 'dummy-user-id'])
  .it('shows retrieved user object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'user")
    expect(ctx.stdout).to.contain("type: \'person")
  })
})
