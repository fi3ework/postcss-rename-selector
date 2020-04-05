import postcss, { Rule } from 'postcss'
import parser, { Root, Node, Options as PspOptions } from 'postcss-selector-parser'
import invariant from 'tiny-invariant'

export interface StringReplace {
  type: 'string'
  replacer: (raw: string) => string
  options?: Partial<PspOptions>
}

type PspMethods =
  | 'each'
  | 'walk'
  | 'walkAttributes'
  | 'walkClasses'
  | 'walkCombinators'
  | 'walkComments'
  | 'walkIds'
  | 'walkNesting'
  | 'walkPseudos'
  | 'walkTags'

export interface SelectorReplace {
  type: PspMethods
  replacer: (node: Node) => boolean | void
  options?: Partial<PspOptions>
}

type Options = StringReplace | SelectorReplace

const replacer = postcss.plugin('css-replace-postcss-plugin', (opts?: Options) => {
  const stringReplace = (selector: string): string => {
    invariant(opts, 'Expects options for postcss-rename-selector')
    invariant(opts.type === 'string', 'Expects type to be string')
    return opts.replacer(selector)
  }

  const transform = (selectors: Root) => {
    invariant(opts, 'Expects options for postcss-rename-selector')
    invariant(opts.type !== 'string', 'Expects type to be walk')

    selectors[opts.type](opts.replacer)
  }

  const visitor = (atRule: Rule, index: number): any => {
    const rawSelectors = atRule.selector
    invariant(opts, 'Expects options for postcss-rename-selector')
    const { options } = opts
    if (opts.type === 'string') {
      const transformed = stringReplace(atRule.selector)
      atRule.selector = transformed
    } else {
      const transformed = parser(transform).processSync(rawSelectors, options)
      atRule.selector = transformed
    }
  }

  return (css) => {
    if (!opts) return
    css.walkRules(visitor)
  }
})

export { replacer }
export * as presets from './presets'
