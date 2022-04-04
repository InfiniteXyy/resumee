import Tippy from '@tippyjs/react/headless'
import React from 'react'
import type { TippyProps } from '@tippyjs/react/headless'

export function Tooltip({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <Tippy
      render={() => <span className="bg-dark-500 rounded-md px-2 py-1 text-sm text-white opacity-75">{title}</span>}
    >
      {children}
    </Tippy>
  )
}

export function Dropdown({ children, overlay, ...props }: { overlay: React.ReactNode } & TippyProps) {
  return (
    <Tippy
      interactive
      render={() => (
        <div className="dark:border-dark-100 rounded-md border-[0.5px] border-gray-200 bg-white text-[14px] shadow-2xl dark:bg-dark-800">
          {overlay}
        </div>
      )}
      trigger="click"
      {...props}
    >
      {children}
    </Tippy>
  )
}
