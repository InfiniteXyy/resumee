import useMedia from 'use-media'
import { Editor, Tabs } from '@/components'
import { usePersistedStore, useWindiProcessor } from '@/hooks'
import { ResumePreview, ResumePreviewDownload } from './resume-preview'

export function ResumeEditor() {
  const { resumeContent, styleContent, setResumeContent, setStyleContent } = usePersistedStore()
  const { processor } = useWindiProcessor()

  const [tab, setTab] = useState<'resume' | 'style' | 'preview'>('resume')
  const isMobile = useMedia({ maxWidth: 768 })

  useEffect(() => {
    if (!isMobile && tab === 'preview') setTab('resume')
  }, [isMobile, tab])

  return (
    <>
      <header className="flex items-center p-2">
        <Tabs
          currentTab={tab}
          setTab={setTab}
          tabs={[
            { value: 'resume', label: '简历' },
            { value: 'style', label: '样式' },
            ...(isMobile ? ([{ value: 'preview', label: '预览' }] as const) : []),
          ]}
        />

        <div className="text-dark-50 ml-auto flex gap-4">
          {tab === 'preview' && <ResumePreviewDownload className="text-dark-50 dark:text-light-100 hidden md:block " />}
        </div>
      </header>
      <main className="children:h-full h-full overflow-hidden">
        {tab === 'resume' && (
          <Editor language="markdown" onChange={setResumeContent} processor={processor} value={resumeContent} />
        )}
        {tab === 'style' && (
          <Editor language="css" onChange={setStyleContent} processor={processor} value={styleContent} />
        )}
        {tab === 'preview' && <ResumePreview />}
      </main>
    </>
  )
}
