import {expect, test} from '@oclif/test'

describe('page:retrieve:property_item', () => {
  test
  .stdout()
  .command(['page:retrieve:property_item'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['page:retrieve:property_item', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
