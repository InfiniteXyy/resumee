import { Section } from '@/components'
import { ResumeEditor } from './resume-editor'
import { ResumePreview, ResumePreviewDownload } from './resume-preview'

export function EditorPage() {
  return (
    <div className="children:h-full grid h-full w-full grid-cols-2 gap-4 overflow-hidden p-4 md:grid-cols-1 md:p-0">
      <Section>
        <ResumeEditor />
      </Section>
      <Section className="items-center !bg-white md:hidden">
        <header className="flex w-full justify-end gap-2 px-2 pt-2">
          <ResumePreviewDownload className="text-dark-50" />
        </header>
        <ResumePreview />
      </Section>
    </div>
  )
}
