import {expect, test} from '@oclif/test'

const apiMock = (response: any) => {
  return test
  .nock('https://api.notion.com', api => api
    .get('/v1/blocks/dummy-block-id')
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
  has_children: true,
  archived: false,
  type: 'child_page',
  child_page: {
    title: 'dummy child page title',
  }
}

describe('block:retrieve', () => {
  describe('shows ux.table result', () => {
    apiMock(response)
    .command(['block:retrieve', 'dummy-block-id'])
    .it('shows retrieved block object when success', ctx => {
      expect(ctx.stdout).to.match(/Object.*Id.*Type.*Parent.*Content/)
      expect(ctx.stdout).to.match(/block.*dummy-block-id.*child_page.*dummy child page title/)
    })
  })

  describe('shows raw json result', () => {
    apiMock(response)
    .command(['block:retrieve', 'dummy-block-id', '--raw'])
    .exit(0)
    .it('shows retrieved block object when success', ctx => {
      expect(ctx.stdout).to.contain("object\": \"block")
      expect(ctx.stdout).to.contain("type\": \"child_page")
    })
  })
})
