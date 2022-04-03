import Prism from 'prismjs'
import { hoverTooltip } from '@codemirror/tooltip'
import type Processor from 'windicss'
import 'prismjs/themes/prism-coy.min.css'

export const hoverPreview = (processor: Processor) => {
  return hoverTooltip((view, pos, side) => {
    const { from, to, text } = view.state.doc.lineAt(pos)
    let start = pos
    let end = pos
    while (start > from && /[^\s"';`]/.test(text[start - from - 1] || '')) start--
    while (end < to && /[^\s"';`]/.test(text[end - from] || '')) end++
    if ((start === pos && side < 0) || (end === pos && side > 0)) return null
    const word = text.slice(start - from, end - from)
    const result = processor.interpret(word)
    if (result.ignored.length > 0) return null

    return {
      pos: start,
      end,
      above: true,
      create() {
        const dom = document.createElement('div')
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const highlightedCSS = Prism.highlight(result.styleSheet.build(), Prism.languages.css!, 'css')
        dom.className = 'text-sm p-2'
        dom.innerHTML = `<pre><code>${highlightedCSS}</code></pre>`
        return { dom }
      },
    }
  })
}
