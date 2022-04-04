import Tippy from '@tippyjs/react/headless'
import React from 'react'
import type { TippyProps } from '@tippyjs/react/headless'

export function Tooltip({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <Tippy
      render={() => (
        <div className="animate-fade-in animate-duration-200 bg-dark-50 rounded-md px-2 py-1 text-sm text-white">
          {title}
        </div>
      )}
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
        <div className="animate-fade-in animate-duration-200 dark:border-dark-100 dark:bg-dark-800 rounded-md border-[0.5px] border-gray-200 bg-white text-[14px] shadow-2xl duration-75">
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
