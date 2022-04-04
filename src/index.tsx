import { memo } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'virtual:windi.css'
import IconMenu from '~icons/carbon/menu'
import IconMoon from '~icons/carbon/moon'
import IconSun from '~icons/carbon/sun'
import { Dropdown, Sidebar } from './components'
import './components/scrollbar.css'
import { useDarkMode } from './hooks'
import './index.css'
import { EditorPage, ExplorePage } from './pages'

const MainRouter = memo(function Router() {
  return (
    <Routes>
      <Route element={<EditorPage />} path="/" />
      <Route element={<ExplorePage />} path="/explore" />
    </Routes>
  )
})

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
          <Dropdown overlay={<Sidebar />}>
            <button aria-label="目录" className="mr-2" onClick={() => setSidebarOpen(!sidebarOpen)} type="button">
              <IconMenu className="block h-5 w-5" />
            </button>
          </Dropdown>
          <div className="text-xl font-medium">Resumee</div>
          <button
            aria-label="黑夜模式"
            className="dark:text-light-50 children:block ml-auto text-gray-500"
            onClick={toggleDarkMode}
            type="button"
          >
            {isDarkMode ? <IconSun /> : <IconMoon />}
          </button>
        </header>
        <main className="mx-auto h-full w-full max-w-[1600px] overflow-hidden">
          <MainRouter />
        </main>
      </div>
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
if (!container) throw new Error('container not found')
createRoot(container).render(<App />)
