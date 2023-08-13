import {expect, test} from '@oclif/test'

describe('block:retrieve:children', () => {
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
          ritch_text: [
            {
              type: 'text',
              text: {
                content: 'dummy-heading-2-content',
                link: null,
              },
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

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/blocks/dummy-block-id/children')
    .reply(200, response)
  )
  .stdout()
  .command(['block:retrieve:children', 'dummy-block-id'])
  .it('shows retrieved block object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'list")
    expect(ctx.stdout).to.contain("results: \[")
    expect(ctx.stdout).to.contain("type: \'block")
  })
})
