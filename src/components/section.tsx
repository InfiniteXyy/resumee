import React from 'react'
import clsx from 'clsx'

export function Section({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      className={clsx(
        'flex h-full flex-col overflow-hidden rounded-md bg-white shadow-md dark:bg-dark-500 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
