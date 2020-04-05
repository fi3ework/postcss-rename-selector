import parser, { Node } from 'postcss-selector-parser'

export function antdScopeReplacer(node: Node) {
  if (node.type === 'selector') {
    const firstAntClassNodeIndex = node.nodes.findIndex((n) => {
      return n.type === 'class' && n.value.startsWith('ant-')
    })
    if (firstAntClassNodeIndex < 0) return

    // preserve line break
    const firstAntClassNode = node.nodes[firstAntClassNodeIndex]
    const before = firstAntClassNode.rawSpaceBefore
    firstAntClassNode.setPropertyWithoutEscape('rawSpaceBefore', '')

    const universal = parser.universal({
      value: '*',
      spaces: {
        before: before,
        after: '',
      },
    })

    const attr = parser.attribute({
      attribute: 'class',
      operator: '*=',
      value: `"ant-"`,
      raws: {},
    })

    firstAntClassNode.parent!.nodes.splice(firstAntClassNodeIndex, 0, universal, attr)
  }
}
