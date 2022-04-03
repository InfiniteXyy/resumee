import clsx from 'clsx'
import { Link, useMatch } from 'react-router-dom'

const menu = [
  { path: '/', label: '编辑器' },
  { path: '/version', label: '版本管理' },
  { path: '/explore', label: '探索' },
]

function MenuItem(props: { item: { path: string; label: string } }) {
  const { item } = props
  const isActive = useMatch(item.path)
  return (
    <li key={item.path}>
      <Link
        className={clsx(
          'hover:bg-light-600 underline-transparent block cursor-pointer rounded-sm px-2 py-1 transition',
          isActive ? 'text-dark-400 font-bold' : 'text-true-gray-400'
        )}
        to={item.path}
      >
        {item.label}
      </Link>
    </li>
  )
}
export function Sidebar() {
  return (
    <aside aria-label="Sidebar" className="w-32">
      <div className="overflow-y-auto rounded">
        <ul className="space-y-2 py-1">
          {menu.map((item) => (
            <MenuItem item={item} key={item.path} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
