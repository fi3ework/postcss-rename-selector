import parser, { Node } from 'postcss-selector-parser'

export function antdScopeReplacer(node: Node) {
  if (node.type === 'selector') {
    const firstAntClassNode = node.nodes.filter((n) => {
      return n.type === 'class' && n.value.startsWith('ant-')
    })[0]
    if (!firstAntClassNode) return

    // preserve line break
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

    firstAntClassNode.parent!.nodes.unshift(universal, attr)
  }
}
