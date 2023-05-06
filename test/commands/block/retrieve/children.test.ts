import {expect, test} from '@oclif/test'

describe('block:retrieve:children', () => {
  test
  .stdout()
  .command(['block:retrieve:children'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['block:retrieve:children', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
