import { lazy, Suspense } from 'react'
import type { EditorProps } from './editor'

const LazyEditor = lazy(() => import('./editor').then((mod) => ({ default: mod.Editor })))

export function Editor(props: EditorProps) {
  return (
    <Suspense fallback={null}>
      <LazyEditor {...props} />
    </Suspense>
  )
}
