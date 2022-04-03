import { useEffect, useRef, useState } from 'react'
import srcdoc from './iframe-srcdoc.html?raw'

let printPdfSubject: HTMLDivElement | null = null

export function triggerPrintPdf() {
  printPdfSubject?.dispatchEvent(new Event('print'))
}

interface IframePreviewProps {
  dark: boolean
  css: string
  fixedCss: string
  className: string
  html: string
}

export function IframePreview(props: IframePreviewProps) {
  const sandboxRef = useRef<HTMLIFrameElement>(null)

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    printPdfSubject ??= document.createElement('div')
    const printCallback = () => {
      const iframe = sandboxRef.current
      const ifWin = (iframe?.contentWindow || iframe) as { printPage: () => void } | null
      iframe?.focus()
      ifWin?.printPage()
    }
    printPdfSubject.addEventListener('print', printCallback)
    return () => printPdfSubject?.removeEventListener('print', printCallback)
  })

  for (const [key, value] of Object.entries(props)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!isReady) return
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sandboxRef.current?.contentWindow?.postMessage(JSON.stringify({ [key]: value }), location.origin)
    }, [isReady, key, value])
  }

  return (
    <div className="h-full">
      <iframe
        className="h-full w-full bg-transparent"
        onLoad={() => setIsReady(true)}
        ref={sandboxRef}
        sandbox={[
          'allow-forms',
          'allow-modals',
          'allow-pointer-lock',
          'allow-popups',
          'allow-same-origin',
          'allow-scripts',
          'allow-top-navigation-by-user-activation',
        ].join(' ')}
        srcDoc={srcdoc}
        title="preview-doc"
      />
    </div>
  )
}
