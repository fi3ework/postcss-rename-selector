import postcss, { Rule } from 'postcss'
import parser, { Selectors, Selector, Root, Node } from 'postcss-selector-parser'

interface Options {
  before: any[]
  after: any[]
}

const replacer = postcss.plugin('css-replace-postcss-plugin', (opts?: Options) => {
  const transform = (selectors: Root) => {
    selectors.walk((selector: Node) => {
      selector.value = '.ant-' + selector
    })
  }

  const visitor = (atRule: Rule, index: number): any => {
    const rawSelectors = atRule.selector
    const transformed = parser(transform).processSync(rawSelectors, { lossless: false })
    atRule.selector = transformed
  }

  return (css) => {
    css.walkRules(visitor)
  }
})

export { replacer }
