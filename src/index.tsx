import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import IconMoon from '~icons/carbon/moon'
import IconSun from '~icons/carbon/sun'
import IconMenu from '~icons/carbon/menu'
import './components/scrollbar.css'
import { EditorPage, ExplorePage, VersionsPage } from './pages'
import 'virtual:windi.css'
import './index.css'
import { useDarkMode } from './hooks'
import { Sidebar } from './components'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

export function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      window.document.body.classList.add('dark')
    } else {
      window.document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <BrowserRouter>
      <div className="bg-light-400 dark:bg-dark-400 flex h-full flex-col overflow-hidden">
        <header className="border-light-900 dark:border-dark-900 dark:bg-dark-900 text-dark-600 dark:text-light-600 z-10 flex h-12 flex-shrink-0 items-center border-b bg-white px-4 shadow-sm md:px-2">
          <Tippy arrow={false} content={<Sidebar />} interactive theme="light" trigger="click">
            <button className="mr-2" onClick={() => setSidebarOpen(!sidebarOpen)} type="button">
              <IconMenu className="block h-5 w-5" />
            </button>
          </Tippy>
          <div className="text-xl font-medium">Resumee</div>
          <button
            className="dark:text-light-50 children:block ml-auto text-gray-500"
            onClick={toggleDarkMode}
            type="button"
          >
            {isDarkMode ? <IconSun /> : <IconMoon />}
          </button>
        </header>
        <Routes>
          <Route element={<EditorPage />} path="/" />
          <Route element={<ExplorePage />} path="/explore" />
          <Route element={<VersionsPage />} path="/versions" />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
