import {expect, test} from '@oclif/test'

describe('page:archive', () => {
  test
  .stdout()
  .command(['page:archive'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['page:archive', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
