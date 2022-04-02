import clsx from 'clsx'
import React from 'react'

export function Section({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section className={clsx('rounded shadow-sm p-4 bg-white overflow-hidden', className)} {...props}>
      {children}
    </section>
  )
}
