import postcss from 'postcss'
import { replacer } from '../src'

describe('selector replace', () => {
  it('basic change', async () => {
    const result = await postcss([
      replacer({
        type: 'walkClasses',
        replacer: (node) => {
          node.value = node.value
        },
      }),
    ]).process('.a, .b, .c { color: red };', {
      from: undefined,
    })
    expect(result.css).toEqual('.a, .b, .c { color: red };')
  })

  it('add prefix', async () => {
    const result = await postcss([
      replacer({
        type: 'walkClasses',
        replacer: (node) => {
          if (!node.value) return
          if (node.value === 'b') {
            node.value = 'ant-' + node.value
          }
        },
      }),
    ]).process('.a, .b, .c { color: red };', {
      from: undefined,
    })
    expect(result.css).toEqual('.a, .ant-b, .c { color: red };')
  })

  it('multi line', async () => {
    const result = await postcss([
      replacer({
        type: 'walkClasses',
        replacer: (node) => {
          if (!node.value) return
          if (node.value === 'b') {
            node.value = 'ant-' + node.value
          }
        },
      }),
    ]).process(
      `.a,
.b,
.c {
  color: red
};`,
      {
        from: undefined,
      }
    )
    expect(result.css).toEqual(`.a,
.ant-b,
.c {
  color: red
};`)
  })

  it('multi replace', async () => {
    const result = await postcss([
      replacer({
        type: 'walkClasses',
        replacer: (node) => {
          const value = node.value
          if (!value) return
          node.value = value.startsWith('ant-') ? value.slice(4) : value
        },
      }),
    ]).process(
      `.ant-a,
.ant-b,
.c,
.ant-d {
  color: red
};`,
      {
        from: undefined,
      }
    )
    expect(result.css).toEqual(`.a,
.b,
.c,
.d {
  color: red
};`)
  })
})
