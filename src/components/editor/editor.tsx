import ReactCodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { css } from '@codemirror/lang-css'
import { EditorView } from '@codemirror/view'
import './editor.css'
import { memo } from 'react'
import { autocompletion } from '@codemirror/autocomplete'
import { useDarkMode } from '@/hooks'
import { hoverPreview } from './editor-hover-preview'
import type Processor from 'windicss'

interface EditorProps {
  language: 'css' | 'markdown'
  value: string
  onChange: (value: string) => void
  processor: Processor
}
export const Editor = memo(function Editor(props: EditorProps) {
  const { language, onChange, value, processor } = props
  const { isDarkMode } = useDarkMode()

  return (
    <ReactCodeMirror
      extensions={[
        language === 'css' ? css() : markdown({}),
        EditorView.lineWrapping,
        ...(language === 'css' ? [hoverPreview(processor), autocompletion({ icons: false })] : []),
      ]}
      height="100%"
      onChange={onChange}
      theme={isDarkMode ? 'dark' : 'light'}
      value={value}
    />
  )
})
