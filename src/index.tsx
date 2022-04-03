import ReactDOM from 'react-dom'
import IconMoon from '~icons/carbon/moon'
import IconSun from '~icons/carbon/sun'
import { Section } from './components'
import './components/scrollbar.css'
import { ResumeEditor } from './resume-editor'
import { ResumePreview } from './resume-preview'
import 'virtual:windi.css'
import './index.css'
import { useDarkMode } from './hooks'

export function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    if (isDarkMode) {
      window.document.body.classList.add('dark')
    } else {
      window.document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="bg-light-400 dark:bg-dark-400 flex h-full flex-col overflow-hidden">
      <header className="border-light-900 dark:border-dark-900 dark:bg-dark-900 text-dark-600 dark:text-light-600 z-10 flex h-12 flex-shrink-0 items-center border-b bg-white  px-4 shadow-sm">
        <div className="text-xl font-medium">Resumee</div>
        <button className="dark:text-light-50 ml-auto text-gray-500" hidden onClick={toggleDarkMode} type="button">
          {isDarkMode ? <IconSun /> : <IconMoon />}
        </button>
      </header>
      <main className="children:h-full mx-auto grid h-full h-full w-full max-w-[1600px] grid-cols-2 gap-4 overflow-hidden p-4 md:grid-cols-1">
        <Section>
          <ResumeEditor />
        </Section>
        <Section className="items-center !bg-white md:hidden">
          <ResumePreview />
        </Section>
      </main>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
