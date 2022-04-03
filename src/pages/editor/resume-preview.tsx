import { marked } from 'marked'
import Tippy from '@tippyjs/react'
import IconCloudDownload from '~icons/carbon/cloud-download'
import { IframePreview, triggerPrintPdf } from '@/components'
import { usePersistedStore, useWindiCSS } from '@/hooks'

export function ResumePreviewDownload() {
  return (
    <Tippy content="打印成 PDF">
      <button onClick={triggerPrintPdf} type="button">
        <IconCloudDownload className="text-dark-50 h-4 w-4" />
      </button>
    </Tippy>
  )
}

export function ResumePreview() {
  const { resumeContent, styleContent } = usePersistedStore()

  const htmlCode = useMemo(() => {
    const matchedConfig = /^-+$\n(?<config>[^]+)\n^-+$/m.exec(resumeContent)

    const config = (matchedConfig?.groups?.config ?? '').split('\n').reduce((prev: { [key: string]: string }, cur) => {
      const [key, value] = cur
        .trim()
        .split(':')
        .map((i) => i.trim())
      if (key && value) prev[key] = value
      return prev
    }, {})
    return `${config.title ? `<div class="title">${config.title}</div>` : ''}${marked.parse(
      resumeContent.replace(/^-+$\n(?<config>[^]+)\n^-+$/m, '')
    )}`
  }, [resumeContent])

  const { generatedCSS } = useWindiCSS(htmlCode, styleContent)

  return (
    <div className="m-4 h-full w-full max-w-[800px] md:m-0">
      <IframePreview className="h-full w-full" css={generatedCSS} dark={false} fixedCss="" html={htmlCode} />
    </div>
  )
}
