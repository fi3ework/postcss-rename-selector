import postcss from 'postcss'
import { replacer } from '../src'

describe('basic replace', () => {
  it('basic1', async () => {
    const result = await postcss([replacer()]).process('a, b, c { color: red };', {
      from: undefined,
    })
    expect(result.css).toEqual('.ant-a,.ant-b,.ant-c { color: red };')
  })
})
