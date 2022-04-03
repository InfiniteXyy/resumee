import clsx from 'clsx'

interface TabsProps<T extends string> {
  tabs: { value: T; label: string }[]
  currentTab: T
  setTab: (tab: T) => void
}

export function Tabs<T extends string>(props: TabsProps<T>) {
  const { currentTab, setTab, tabs } = props
  return (
    <div className="flex gap-2">
      {tabs.map((tab, index) => (
        <button
          className={clsx(
            'inline-block rounded-lg py-1 px-2 text-xs font-medium transition',
            tab.value === currentTab
              ? 'active bg-gray-600 text-white'
              : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
          )}
          key={tab.value}
          onClick={() => setTab(tab.value)}
          role="tab"
          tabIndex={index}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
