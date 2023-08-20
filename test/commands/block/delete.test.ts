import {expect, test} from '@oclif/test'

const apiMock = (response: any) => {
  return test
  .nock('https://api.notion.com', api => api
    .delete('/v1/blocks/dummy-block-id')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})
}

const response = {
  object: 'block',
  id: 'dummy-block-id',
  parent: {
    type: 'page_id',
    page_id: 'dummy-page-id',
  },
  has_children: false,
  archived: true,
  type: 'heading_2',
  heading_2: {
    rich_text: [
      {
        type: 'text',
        plain_text: 'dummy-heading-2-content',
      }
    ]
  }
}

describe('block:delete', () => {
  describe('shows ux.table result', () => {
    apiMock(response)
    .command(['block:delete', 'dummy-block-id'])
    .it('shows deleted block object when success', ctx => {
      expect(ctx.stdout).to.match(/Object.*Id.*Type.*Parent.*Content/)
      expect(ctx.stdout).to.match(/block.*dummy-block-id.*heading_2.*dummy-heading-2-content/)
    })
  })

  describe('shows raw json result', () => {
    apiMock(response)
    .command(['block:delete', 'dummy-block-id', '--raw'])
    .exit(0)
    .it('shows deleted block object when success', ctx => {
      expect(ctx.stdout).to.contain("object\": \"block")
      expect(ctx.stdout).to.contain("id\": \"dummy-block-id")
      expect(ctx.stdout).to.contain("archived\": true")
    })
  })
})
