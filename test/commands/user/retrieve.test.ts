import {expect, test} from '@oclif/test'

describe('user:retrieve', () => {
  test
  .stdout()
  .command(['user:retrieve'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['user:retrieve', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
