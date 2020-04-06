import parser, { Node } from 'postcss-selector-parser'
import { SelectorReplace } from '../index'

export function antdScopeReplacerFn(node: Node) {
  if (node.type !== 'selector') return

  const firstAntClassNodeIndex = node.nodes.findIndex((n) => {
    return n.type === 'class' && n.value.startsWith('ant-')
  })
  if (firstAntClassNodeIndex < 0) return

  const firstAntClassNode = node.nodes[firstAntClassNodeIndex]
  const prevNode = node.nodes[firstAntClassNodeIndex - 1]

  // preserve line break
  const spaces = {
    before: firstAntClassNode.rawSpaceBefore,
    after: firstAntClassNode.rawSpaceAfter,
  }

  firstAntClassNode.setPropertyWithoutEscape('rawSpaceBefore', '')
  const toInsert = []

  if (firstAntClassNodeIndex === 0 || prevNode.type === 'combinator') {
    const universal = parser.universal({
      value: '*',
    })
    toInsert.push(universal)
  }

  const attr = parser.attribute({
    attribute: 'class',
    operator: '*=',
    value: `"ant-"`,
    raws: {},
  })

  toInsert.push(attr)
  toInsert[0].spaces = spaces

  firstAntClassNode.parent!.nodes.splice(firstAntClassNodeIndex, 0, ...toInsert)
}

export const antdReplacer: SelectorReplace = {
  type: 'each',
  replacer: antdScopeReplacerFn,
}
