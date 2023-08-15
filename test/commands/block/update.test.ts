import {expect, test} from '@oclif/test'

describe('block:update', () => {
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

  test
  .nock('https://api.notion.com', api => api
    .patch('/v1/blocks/dummy-block-id')
    .reply(200, response)
  )
  .stdout()
  .command(['block:update', 'dummy-block-id'])
  .it('shows updated block object when success', ctx => {
    expect(ctx.stdout).to.contain("object\": \"block")
    expect(ctx.stdout).to.contain("id\": \"dummy-block-id")
    expect(ctx.stdout).to.contain("archived\": true")
  })
})
