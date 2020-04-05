import postcss from 'postcss'
import { replacer } from '../src'

describe('string replace', () => {
  it('no change', async () => {
    const result = await postcss([
      replacer({
        type: 'string',
        replacer: (raw) => raw,
      }),
    ]).process('.a, .b, .c { color: red };', {
      from: undefined,
    })
    expect(result.css).toEqual(`.a, .b, .c { color: red };`)
  })

  it('add prefix', async () => {
    const result = await postcss([
      replacer({
        type: 'string',
        replacer: (raw) => {
          return raw.replace('.b', '.ant-b')
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
        type: 'string',
        replacer: (raw) => {
          return raw.replace('.b', '.ant-b')
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
        type: 'string',
        replacer: (raw) => {
          return raw.replace(/(.ant-)(.?)([ |,|{]?)/gm, ($0, $1, $2, $3) => {
            return `.${$2}${$3}`
          })
        },
      }),
    ]).process(
      `.ant-a,
.ant-b,
.ant-c {
  color: red
};`,
      {
        from: undefined,
      }
    )
    expect(result.css).toEqual(`.a,
.b,
.c {
  color: red
};`)
  })
})
