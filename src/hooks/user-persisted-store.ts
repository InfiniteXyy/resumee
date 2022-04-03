import { createTrackedSelector } from 'react-tracked'
import create from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { defaultStore } from '../constants'

const store = create(
  persist(
    combine(defaultStore, (set) => ({
      setResumeContent: (resumeContent: string) => set({ resumeContent }),
      setStyleContent: (styleContent: string) => set({ styleContent }),
      reset: (type: 'style' | 'resume') => {
        type === 'style'
          ? set({ styleContent: defaultStore.styleContent })
          : set({ resumeContent: defaultStore.resumeContent })
      },
    })),
    { name: 'store', version: 5 }
  )
)

export const usePersistedStore = createTrackedSelector(store)
