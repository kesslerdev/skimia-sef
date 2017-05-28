import { Start } from '../src'

describe('start', () => {
  it('class Start can say hello world', () => {
    const start = new Start()

    expect(start.hello()).toBe('Hello World')

  })
})
