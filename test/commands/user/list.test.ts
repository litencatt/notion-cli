import {expect, test} from '@oclif/test'

describe('user:list', () => {
  const response = {
    object: 'list',
    results: [
      {
        object: 'user',
        id: 'dummy-user-id',
        type: 'person',
        person: {
          email: 'dummy-user-email',
        },
        name: 'dummy-user-name',
        avatar_url: 'dummy-user-avatar-url',
      },
      {
        object: 'user',
        id: 'dummy-bot-id',
        type: 'bot',
        bot: {},
        name: 'dummy-bot-name',
        avatar_url: 'dummy-bot-avatar-url',
      }
    ],
    next_cursor: "dummy-next-cursor",
    has_more: false,
  }

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/users')
    .reply(200, response)
  )
  .stdout()
  .command(['user:list'])
  .it('shows all user objects when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'list")
    expect(ctx.stdout).to.contain("object: \'user")
  })
})
