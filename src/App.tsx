import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import create from 'zustand'
import { persist, combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { use, parse } from 'marked'
import { useEffect } from 'react'
import { Input, Section } from './components'

type ThemeConfig = { [key in 'heading']: string }
const store = create(
  persist(
    combine(
      {
        resumeContent: '',
        themeConfig: {} as ThemeConfig,
      },
      (set) => ({
        setResumeContent: (resumeContent: string) => set({ resumeContent }),
        setThemeConfig: (themeConfig: ThemeConfig) => set({ themeConfig }),
      })
    ),
    { name: 'store' }
  )
)
const useStore = createTrackedSelector(store)

export function App() {
  const { resumeContent, setResumeContent, themeConfig, setThemeConfig } = useStore()

  useEffect(() => {
    use({
      renderer: {
        heading(text, level) {
          return `
              <h${level} class="${themeConfig.heading}">
                ${text}
              </h${level}>`
        },
      },
    })
  }, [themeConfig.heading])

  return (
    <div className="bg-light-400 h-full grid grid-cols-2 h-full children:h-full gap-2 p-2">
      <Section>
        <SimpleMDE onChange={setResumeContent} spellCheck={false} style={{ height: '100%' }} value={resumeContent} />
      </Section>
      <Section className="row-span-2">
        <div dangerouslySetInnerHTML={{ __html: parse(resumeContent) }} />
      </Section>
      <Section>
        <Input onChange={(e) => setThemeConfig({ heading: e.target.value })} value={themeConfig.heading} />
      </Section>
    </div>
  )
}
