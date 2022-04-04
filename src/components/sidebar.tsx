import clsx from 'clsx'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import IconEdit from '~icons/carbon/edit'
import IconBranch from '~icons/carbon/branch'
import IconExplore from '~icons/carbon/explore'

interface MenuItem {
  path: string
  label: string
  icon: React.ReactNode
}
const menu: MenuItem[] = [
  { path: '/', label: '编辑器', icon: <IconEdit /> },
  { path: '/versions', label: '版本管理', icon: <IconBranch /> },
  { path: '/explore', label: '探索', icon: <IconExplore /> },
]

function MenuItem(props: { item: MenuItem }) {
  const { item } = props
  const isActive = useMatch(item.path)
  return (
    <li key={item.path}>
      <Link
        className={clsx(
          'hover:bg-light-600 underline-transparent block cursor-pointer rounded-sm p-1 transition flex items-center gap-2',
          isActive ? 'text-dark-400 font-bold' : 'text-true-gray-400'
        )}
        to={item.path}
      >
        <div className='children:block'>{item.icon}</div>
        {item.label}
      </Link>
    </li>
  )
}
export function Sidebar() {
  return (
    <aside aria-label="Sidebar" className="w-32">
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
