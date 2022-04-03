import { Link } from 'react-router-dom'

const menu = [
  { path: '/', label: '编辑器' },
  { path: '/explore', label: '探索' },
]
export function Sidebar() {
  return (
    <aside aria-label="Sidebar" className="w-32">
      <div className="overflow-y-auto rounded">
        <ul className="space-y-2 py-1">
          {menu.map((item) => (
            <li key={item.path}>
              <Link className="hover:bg-light-600 block cursor-pointer rounded-lg p-2 transition" to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
