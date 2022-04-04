import useMedia from 'use-media'
import { Dropdown, Editor, Tabs, Versions } from '@/components'
import { useCurrentDraft, usePersistedStore, useWindiProcessor } from '@/hooks'
import IconChevronRight from '~icons/carbon/chevron-right'
import { ResumePreview, ResumePreviewDownload } from './resume-preview'

export function ResumeEditor() {
  const { setResumeContent, setStyleContent } = usePersistedStore()
  const draft = useCurrentDraft()
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
          <Dropdown overlay={<Versions />} placement="bottom-end">
            <button
              className="dark:text-light-500 hover:bg-light-400 focus:bg-light-400 flex items-center gap-1 rounded px-2 py-1 text-gray-500 transition dark:hover:bg-gray-600 dark:focus:bg-gray-600"
              type="button"
            >
              <span className="text-xs font-bold">管理简历</span>
              <IconChevronRight className="h-3 w-3" />
            </button>
          </Dropdown>
        </div>
      </header>
      <main className="children:h-full h-full overflow-hidden">
        {tab === 'resume' && (
          <Editor language="markdown" onChange={setResumeContent} processor={processor} value={draft.resumeContent} />
        )}
        {tab === 'style' && (
          <Editor language="css" onChange={setStyleContent} processor={processor} value={draft.styleContent} />
        )}
        {tab === 'preview' && <ResumePreview />}
      </main>
    </>
  )
}
