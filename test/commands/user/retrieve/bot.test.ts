import {expect, test} from '@oclif/test'

describe('user:retrieve:bot', () => {
  test
  .stdout()
  .command(['user:retrieve:bot'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['user:retrieve:bot', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
