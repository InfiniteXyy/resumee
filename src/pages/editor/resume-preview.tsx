import IconCloudDownload from '~icons/carbon/cloud-download'
import { IframePreview, Tooltip, triggerPrintPdf } from '@/components'
import { useCurrentDraft, useParseHTMLCode } from '@/hooks'

export function ResumePreviewDownload(props: { className?: string }) {
  return (
    <Tooltip title="打印 PDF">
      <button aria-label="打印 PDF" className={props.className} onClick={triggerPrintPdf} type="button">
        <IconCloudDownload className="h-4 w-4" />
      </button>
    </Tooltip>
  )
}

export function ResumePreview() {
  const { resumeContent, styleContent } = useCurrentDraft()

  const { generatedCSS, htmlCode } = useParseHTMLCode(resumeContent, styleContent)

  return (
    <div className="m-4 h-full w-full max-w-[800px] md:m-0">
      <IframePreview className="h-full w-full" css={generatedCSS} dark={false} fixedCss="" html={htmlCode} />
    </div>
  )
}
