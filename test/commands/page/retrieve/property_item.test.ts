import {expect, test} from '@oclif/test'

describe('page:retrieve:property_item', () => {
  const response = {
    object: 'list',
    results: [
      {
        type: 'title',
        id: 'title',
        title: {
          type: 'title',
          text: {
            content: 'dummy title',
            link: null,
          },
        }
      },
    ],
    next_cursor: null,
    has_more: false,
    type: 'property_item',
  }

  test
  .nock('https://api.notion.com', api => api
    .get('/v1/pages/dummy-page-id/properties/dummy-property-id')
    .reply(200, response)
  )
  .stdout()
  .command(['page:retrieve:property_item', 'dummy-page-id', 'dummy-property-id'])
  .it('shows retrieved page object when success', ctx => {
    expect(ctx.stdout).to.contain("object: \'list")
    expect(ctx.stdout).to.contain("type: \'property_item")
  })
})
