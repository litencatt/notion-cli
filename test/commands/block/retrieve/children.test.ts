import {expect, test} from '@oclif/test'

const apiMock = (response: any) => {
  return test
  .nock('https://api.notion.com', api => api
    .get('/v1/blocks/dummy-block-id/children')
    .reply(200, response)
  ).stdout({print: process.env.TEST_DEBUG ? true : false})
}

const response = {
  object: 'list',
  results: [
    {
      object: 'block',
      id: 'dummy-block-id',
      parent: {
        type: 'page_id',
        page_id: 'dummy-page-id',
      },
      has_children: true,
      archived: false,
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
  ],
  next_cursor: "dummy-next-cursor",
  has_more: false,
  type: 'block',
  block: {},
}

describe('block:retrieve:children', () => {
  describe('shows ux.table result', () => {
    apiMock(response)
    .command(['block:retrieve:children', 'dummy-block-id', '--no-truncate'])
    .it('shows deleted block object when success', ctx => {
      expect(ctx.stdout).to.match(/Object.*Id.*Type.*Content/)
      expect(ctx.stdout).to.match(/block.*dummy-block-id.*heading_2.*dummy-heading-2-content/)
    })
  })
  describe('shows raw json result', () => {
    apiMock(response)
    .command(['block:retrieve:children', 'dummy-block-id', '--raw'])
    .exit(0)
    .it('shows updated block object when success', ctx => {
      expect(ctx.stdout).to.contain("object\": \"list")
      expect(ctx.stdout).to.contain("results\": [")
      expect(ctx.stdout).to.contain("type\": \"block")
    })
  })
})
