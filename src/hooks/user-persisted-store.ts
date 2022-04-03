import { createTrackedSelector } from 'react-tracked'
import create from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { defaultStore } from '../constants'

const store = create(
  persist(
    combine(defaultStore, (set) => ({
      setResumeContent: (resumeContent: string) => set({ resumeContent }),
      setStyleContent: (styleContent: string) => set({ styleContent }),
      reset: () => set(defaultStore),
    })),
    { name: 'store', version: 5 }
  )
)

export const usePersistedStore = createTrackedSelector(store)
