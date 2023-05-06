import {expect, test} from '@oclif/test'

describe('db:retrieve', () => {
  test
  .stdout()
  .command(['db:retrieve'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['db:retrieve', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
