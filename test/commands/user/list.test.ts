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
        bot: {
          owner: {
            type: 'workspace',
            workspace: true,
          }
        },
        name: 'dummy-bot-name',
        avatar_url: 'dummy-bot-avatar-url',
      }
    ],
    next_cursor: "dummy-next-cursor",
    has_more: false,
    type: 'user',
    user: {},
  }

  const apiMock = test.nock('https://api.notion.com', api => api
    .get('/v1/users')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('with no flags', () => {
    apiMock
    .command(['user:list', '--no-truncate'])
    .it('shows user list table', ctx => {
      expect(ctx.stdout).to.match(/Id.*Name.*Object.*Type.*person\/bot.*Avatar url/)
      expect(ctx.stdout).to.match(/dummy-user-id.*dummy-user-name.*user.*person.*dummy-user-avatar-url/)
      expect(ctx.stdout).to.match(/dummy-bot-id.*dummy-bot-name.*user.*bot.*dummy-bot-avatar-url/)
    })
  })

  describe('with --raw flags', () => {
    apiMock
    .command(['user:list', '--raw'])
    .exit(0)
    .it('shows a user list objects', ctx => {
      expect(ctx.stdout).to.contain("object: 'list")
      expect(ctx.stdout).to.contain("object: 'user")
      expect(ctx.stdout).to.contain("type: 'person")
      expect(ctx.stdout).to.contain("type: 'bot")
    })
  })
})
