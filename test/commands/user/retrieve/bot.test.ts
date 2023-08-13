import {expect, test} from '@oclif/test'

describe('user:retrieve:bot', () => {
  const response = {
    object: 'user',
    id: 'dummy-bot-id',
    name: 'dummy-user-name',
    avatar_url: null,
    type: 'bot',
    bot: {
      owner: {
        type: 'user',
        user: {
          object: 'user',
          id: 'dummy-user-id',
          name: 'dummy-user-name',
          avatar_url: null,
          type: 'person',
          person: {
            email: 'dummy-user-email',
          },
        },
      }
    },

  }

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/users/me')
    .reply(200, response)
  )
  .stdout()
  .command(['user:retrieve:bot'])
  .it('shows retrieved bot object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'user")
    expect(ctx.stdout).to.contain("type: \'bot")
  })
})
