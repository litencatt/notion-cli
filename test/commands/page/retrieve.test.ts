import {expect, test} from '@oclif/test'

describe('page:retrieve', () => {
  test
  .stdout()
  .command(['page:retrieve'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['page:retrieve', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
