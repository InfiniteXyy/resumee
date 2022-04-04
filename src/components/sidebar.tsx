import clsx from 'clsx'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import IconEdit from '~icons/carbon/edit'
import IconExplore from '~icons/carbon/explore'

interface MenuItem {
  path: string
  label: string
  icon: React.ReactNode
}
const menu: MenuItem[] = [
  { path: '/', label: '编辑器', icon: <IconEdit /> },
  { path: '/explore', label: '探索', icon: <IconExplore /> },
]

function MenuItem(props: { item: MenuItem }) {
  const { item } = props
  const isActive = useMatch(item.path)
  return (
    <li key={item.path}>
      <Link
        className={clsx(
          'hover:bg-light-600 dark:hover:bg-dark-600 underline-transparent block flex cursor-pointer items-center gap-2 rounded-sm p-2 transition',
          isActive ? 'text-dark-400 dark:text-light-400 font-bold' : 'text-true-gray-400 dark:text-true-gray-500'
        )}
        to={item.path}
      >
        <div className="children:block">{item.icon}</div>
        {item.label}
      </Link>
    </li>
  )
}
export function Sidebar() {
  return (
    <aside aria-label="Sidebar" className="w-40">
      <div className="overflow-y-auto rounded">
        <ul className="space-y-2 p-1">
          {menu.map((item) => (
            <MenuItem item={item} key={item.path} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
