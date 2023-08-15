import {expect, test} from '@oclif/test'

describe('block:retrieve', () => {
  const response = {
    object: 'block',
    id: 'dummy-block-id',
    parent: {
      type: 'page_id',
      page_id: 'dummy-page-id',
    },
    has_children: true,
    archived: false,
    type: 'child_page',
    child_page: { titie: 'dummy-child-page-title' },
  }

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/blocks/dummy-block-id')
    .reply(200, response)
  )
  .stdout()
  .command(['block:retrieve', 'dummy-block-id'])
  .it('shows retrieved block object when success', ctx => {
    expect(ctx.stdout).to.contain("object\": \"block")
    expect(ctx.stdout).to.contain("type\": \"child_page")
  })
})
