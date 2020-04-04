import postcss from 'postcss'
import { replacer } from '../src'
import parser, { Node } from 'postcss-selector-parser'
import { antdScopeReplacer } from '../src/presets/antd'

describe('selector replace', () => {
  it('scope antd 1', async () => {
    const result = await postcss([
      replacer({
        type: 'each',
        replacer: antdScopeReplacer,
      }),
    ]).process(
      `.ant-alert.ant-alert-no-icon {
  padding: 8px 15px;
}`,
      {
        from: undefined,
      }
    )
    expect(result.css).toEqual(`*[class*="ant-"].ant-alert.ant-alert-no-icon {
  padding: 8px 15px;
}`)
  })

  it('scope antd 2', async () => {
    const result = await postcss([
      replacer({
        type: 'each',
        replacer: antdScopeReplacer,
      }),
    ]).process(
      `.ant-btn-group .ant-btn-primary:first-child:not(:last-child) {
  border-right-color: #297bff;
}`,
      {
        from: undefined,
      }
    )
    expect(result.css)
      .toEqual(`*[class*="ant-"].ant-btn-group .ant-btn-primary:first-child:not(:last-child) {
  border-right-color: #297bff;
}`)
  })

  it('scope antd 3', async () => {
    const result = await postcss([
      replacer({
        type: 'each',
        replacer: antdScopeReplacer,
      }),
    ]).process(
      `.ant-btn-background-ghost.ant-btn-primary-disabled > a:only-child,
.ant-btn-background-ghost.ant-btn-primary.disabled > a:only-child,
.ant-btn-background-ghost.ant-btn-primary[disabled] > a:only-child,
.ant-btn-background-ghost.ant-btn-primary-disabled:hover > a:only-child,
.ant-btn-background-ghost.ant-btn-primary.disabled:hover > a:only-child,
.ant-btn-background-ghost.ant-btn-primary[disabled]:hover > a:only-child,
.ant-btn-background-ghost.ant-btn-primary-disabled:focus > a:only-child,
.ant-btn-background-ghost.ant-btn-primary.disabled:focus > a:only-child,
.ant-btn-background-ghost.ant-btn-primary[disabled]:focus > a:only-child,
.ant-btn-background-ghost.ant-btn-primary-disabled:active > a:only-child,
.ant-btn-background-ghost.ant-btn-primary.disabled:active > a:only-child,
.ant-btn-background-ghost.ant-btn-primary[disabled]:active > a:only-child,
.ant-btn-background-ghost.ant-btn-primary-disabled.active > a:only-child,
.ant-btn-background-ghost.ant-btn-primary.disabled.active > a:only-child,
.ant-btn-background-ghost.ant-btn-primary[disabled].active > a:only-child {
  color: currentColor;
}`,
      {
        from: undefined,
      }
    )
    expect(result.css)
      .toEqual(`*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary-disabled > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary.disabled > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary[disabled] > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary-disabled:hover > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary.disabled:hover > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary[disabled]:hover > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary-disabled:focus > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary.disabled:focus > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary[disabled]:focus > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary-disabled:active > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary.disabled:active > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary[disabled]:active > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary-disabled.active > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary.disabled.active > a:only-child,
*[class*="ant-"].ant-btn-background-ghost.ant-btn-primary[disabled].active > a:only-child {
  color: currentColor;
}`)
  })
})