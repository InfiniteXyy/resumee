import Tippy from '@tippyjs/react'
import IconCloudDownload from '~icons/carbon/cloud-download'
import IconReset from '~icons/carbon/reset'
import { Editor, Tabs, triggerPrintPdf } from './components'
import './components/scrollbar.css'
import { usePersistedStore, useWindiProcessor } from './hooks'

export function ResumeEditor() {
  const { resumeContent, styleContent, setResumeContent, setStyleContent, reset } = usePersistedStore()
  const [tab, setTab] = useState<'resume' | 'style'>('resume')

  const { processor } = useWindiProcessor()

  return (
    <>
      <header className="flex items-center p-2">
        <Tabs
          currentTab={tab}
          setTab={setTab}
          tabs={[
            { value: 'resume', label: '简历' },
            { value: 'style', label: '样式' },
          ]}
        />

        <div className="text-dark-50 ml-auto flex gap-2">
          <Tippy content="打印成 PDF">
            <button className="hidden md:block" onClick={triggerPrintPdf} type="button">
              <IconCloudDownload className="h-4 w-4" />
            </button>
          </Tippy>

          <Tippy content="恢复成默认内容">
            <button
              // eslint-disable-next-line no-alert
              onClick={() => confirm('确定要恢复成默认吗？现在的内容将无法恢复！') && reset()}
              type="button"
            >
              <IconReset className="h-4 w-4" />
            </button>
          </Tippy>
        </div>
      </header>
      <main className="children:h-full h-full overflow-hidden">
        {tab === 'resume' && (
          <Editor language="markdown" onChange={setResumeContent} processor={processor} value={resumeContent} />
        )}
        {tab === 'style' && (
          <Editor language="css" onChange={setStyleContent} processor={processor} value={styleContent} />
        )}
      </main>
    </>
  )
}
