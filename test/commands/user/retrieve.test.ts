import {expect, test} from '@oclif/test'

describe('user:retrieve', () => {
  const responsePerson = {
    object: 'user',
    id: 'dummy-user-id',
    type: 'person',
    person: {
      email: 'dummy-user-email',
    },
    name: 'dummy-user-name',
    avatar_url: 'dummy-user-avatar-url',
  }

  const responseBot = {
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

  const apiMockPerson = test.nock('https://api.notion.com', api => api
    .get('/v1/users/dummy-user-id')
    .reply(200, responsePerson)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('return person response', () => {
    describe('with no flags', () => {
      apiMockPerson
      .command(['user:retrieve', '--no-truncate', 'dummy-user-id'])
      .it('shows retrieved user table', ctx => {
        expect(ctx.stdout).to.match(/Id.*Name.*Object.*Type.*person\/bot.*Avatar url/)
        expect(ctx.stdout).to.match(/dummy-user-id.*dummy-user-name.*user.*person.*dummy-user-avatar-url/)
      })
    })

    describe('with --raw flags', () => {
      apiMockPerson
      .command(['user:retrieve', '--raw', 'dummy-user-id'])
      .exit(0)
      .it('shows a retrieved user objects', ctx => {
        expect(ctx.stdout).to.contain("object\": \"user")
        expect(ctx.stdout).to.contain("type\": \"person")
      })
    })
  })

  const apiMockBot = test.nock('https://api.notion.com', api => api
    .get('/v1/users/dummy-user-id')
    .reply(200, responseBot)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})

  describe('return bot response', () => {
    describe('with no flags', () => {
      apiMockBot
      .command(['user:retrieve', '--no-truncate', 'dummy-user-id'])
      .it('shows retrieved user table', ctx => {
        expect(ctx.stdout).to.match(/Id.*Name.*Object.*Type.*person\/bot.*Avatar url/)
        expect(ctx.stdout).to.match(/dummy-bot-id.*dummy-bot-name.*user.*bot.*dummy-bot-avatar-url/)
      })
    })

    describe('with --raw flags', () => {
      apiMockBot
      .command(['user:retrieve', '--raw', 'dummy-user-id'])
      .exit(0)
      .it('shows a retrieved user objects', ctx => {
        expect(ctx.stdout).to.contain("object\": \"user")
        expect(ctx.stdout).to.contain("type\": \"bot")
      })
    })
  })
})
