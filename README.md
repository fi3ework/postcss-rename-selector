# postcss-rename-selector

A PostCSS plugin for modify CSS selector flexible.

## Usage

Plugin support two ways to modify selectors. In raw mode, you can return a new string from original selector string. In ast mode, you can modify the AST to get a generated selector string.

### raw mode

In this mode, type should be fixed to `string`. Argument `raw` is the raw selector string, and the selector will use the returned new string.

```tsx
import postcss from 'postcss'
import { replacer } from '../src'

module.exports = {
  plugins: [
    replacer({
      type: 'string',
      replacer: (raw) => {
        return raw.replace('.b', '.ant-b')
      },
    }),
  ],
}

// in 👇
// .a, .b, .c { color: red };

// out 👇
// .a, .ant-b, .c { color: red };
```

### AST mode

Based on [postcss-selector-parser](https://github.com/postcss/postcss-selector-parser/blob/master/API.md), `type` could be `each`, `walk`, `walkAttributes`, `walkClasses`, `walkCombinators`, `walkComments`, `walkIds`, `walkNesting`, `walkPseudos`, `walkTags`. Modify node on the ast, and new string will be generated after modification.

```tsx
import postcss from 'postcss'
import { replacer } from '../src'

module.exports = {
  plugins: [
    replacer({
      type: 'string',
      replacer: (node) => {
        const value = node.value
        if (!value) return
        node.value = value.startsWith('ant-') ? value.slice(4) : value
      },
    }),
  ],
}

// in 👇

// .ant-a,
// .ant-b,
// .c,
// .ant-d {
//   color: red
// };

// out 👇

// .a,
// .b,
// .c,
// .d {
//   color: red
// };
```

## License

MIT
