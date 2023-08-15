import {expect, test} from '@oclif/test'

describe('user:retrieve:bot', () => {
  const responseOwnerUser = {
    object: 'user',
    id: 'dummy-bot-id',
    name: 'dummy-bot-name',
    avatar_url: 'dummy-bot-avatar-url',
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

  const responseOwnerWs = {
    object: 'user',
    id: 'dummy-bot-id',
    name: 'dummy-bot-name',
    avatar_url: null,
    type: 'bot',
    bot: {
      owner: {
        type: 'workspace',
        workspace: true,
      },
      workspace_name: 'dummy-workspace-name',
    },
  }

  const apiMockUser = test.nock('https://api.notion.com', api => api
    .get('/v1/users/me')
    .reply(200, responseOwnerUser)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('owner is user', () => {
    describe('with no flags', () => {
      apiMockUser
      .command(['user:retrieve:bot', '--no-truncate'])
      .it('shows retrieved bot table', ctx => {
        expect(ctx.stdout).to.match(/Id.*Name.*Object.*Type.*person\/bot.*Avatar url/)
        expect(ctx.stdout).to.match(/dummy-bot-id.*dummy-bot-name.*user.*bot.*dummy-bot-avatar-url/)
      })
    })

    describe('with --raw flags', () => {
      apiMockUser
      .command(['user:retrieve:bot', '--raw'])
      .exit(0)
      .it('shows a retrieved bot objects', ctx => {
        expect(ctx.stdout).to.contain("object\": \"user")
        expect(ctx.stdout).to.contain("type\": \"bot")
      })
    })
  })

  const apiMockWs = test.nock('https://api.notion.com', api => api
    .get('/v1/users/me')
    .reply(200, responseOwnerWs)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('owner is workspace', () => {
    describe('with no flags', () => {
      apiMockWs
      .command(['user:retrieve:bot', '--no-truncate'])
      .it('shows retrieved bot table', ctx => {
        expect(ctx.stdout).to.match(/Id.*Name.*Object.*Type.*person\/bot.*Avatar url/)
        expect(ctx.stdout).to.match(/dummy-bot-id.*dummy-bot-name.*user.*bot.*/)
      })
    })

    describe('with --raw flags', () => {
      apiMockWs
      .command(['user:retrieve:bot', '--raw'])
      .exit(0)
      .it('shows a retrieved bot objects', ctx => {
        expect(ctx.stdout).to.contain("object\": \"user")
        expect(ctx.stdout).to.contain("type\": \"bot")
      })
    })
  })
})
