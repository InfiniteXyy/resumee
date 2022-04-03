import create from 'zustand'
import { combine, persist } from 'zustand/middleware'

export const useDarkMode = create(
  persist(
    combine({ isDarkMode: false }, (set) => ({
      toggleDarkMode: () => set((prev) => ({ isDarkMode: !prev.isDarkMode })),
    })),
    { name: 'darkMode', version: 1 }
  )
)
