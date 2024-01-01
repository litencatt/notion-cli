import { expect, test } from '@oclif/test'

const apiMock = (response: any) => {
  return test
    .nock('https://api.notion.com', (api) =>
      api.patch('/v1/blocks/dummy-block-id/children').reply(200, response)
    )
    .stdout({ print: process.env.TEST_DEBUG ? true : false })
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
          },
        ],
      },
    },
  ],
  next_cursor: 'dummy-next-cursor',
  has_more: false,
  type: 'block',
  block: {},
}

describe('block:append', () => {
  describe('shows ux.table result', () => {
    apiMock(response)
      .command([
        'block:append',
        '--no-truncate',
        'dummy-block-id',
        '{"type": "heading_2", "heading_2": {"rich_text": [{"type": "text", "plaoin_text": "dummy-heading-2-content"}]}}',
      ])
      .it('shows deleted block object when success', (ctx) => {
        expect(ctx.stdout).to.match(/Object.*Id.*Type.*Parent.*Content/)
        expect(ctx.stdout).to.match(/block.*dummy-block-id.*heading_2.*dummy-heading-2-content/)
      })
  })
  describe('shows raw json result', () => {
    apiMock(response)
      .command([
        'block:append',
        '--raw',
        'dummy-block-id',
        '{"type": "heading_2", "heading_2": {"rich_text": [{"type": "text", "plaoin_text": "dummy-heading-2-content"}]}}',
      ])
      .exit(0)
      .it('shows updated block object when success', (ctx) => {
        expect(ctx.stdout).to.contain('object": "list')
        expect(ctx.stdout).to.contain('results": [')
        expect(ctx.stdout).to.contain('type": "heading_2')
      })
  })
})
