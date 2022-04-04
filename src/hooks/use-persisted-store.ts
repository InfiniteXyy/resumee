import { createTrackedSelector } from 'react-tracked'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { produce } from 'immer'
import { nanoid } from 'nanoid'
import { defaultResume, simpleResumeContent } from '../constants'

export interface ResumeItem {
  resumeContent: string
  styleContent: string
  id: string
}

interface StoreState {
  currentResumeId: string
  resumes: ResumeItem[]
  setResumeContent: (resumeContent: string) => void
  setStyleContent: (styleContent: string) => void
  startEditing: (resumeId: string) => void
  deleteResume: (resumeId: string) => void
  newResume: () => void
}

const defaultResumes: ResumeItem[] = [{ id: 'default', resumeContent: defaultResume.resumeContent, styleContent: '' }]
const useStore = create(
  persist<StoreState>(
    (set) => ({
      currentResumeId: 'default',
      draftSaved: false,
      resumes: defaultResumes,
      setResumeContent: (resumeContent: string) => {
        set(
          produce((state: StoreState) => {
            for (const resume of state.resumes) {
              if (resume.id === state.currentResumeId) {
                resume.resumeContent = resumeContent
                break
              }
            }
          })
        )
      },
      setStyleContent: (styleContent: string) => {
        set(
          produce((state: StoreState) => {
            for (const resume of state.resumes) {
              if (resume.id === state.currentResumeId) {
                resume.styleContent = styleContent
                break
              }
            }
          })
        )
      },
      startEditing: (versionId) => {
        set(
          produce((state: StoreState) => {
            const version = state.resumes.find((i) => i.id === versionId)
            if (version) state.currentResumeId = versionId
          })
        )
      },
      deleteResume: (resumeId) => {
        set(
          produce((state: StoreState) => {
            // eslint-disable-next-line no-alert
            if (!confirm('确定要删除这个简历吗？')) return
            if (state.resumes.length === 1) return
            state.resumes = state.resumes.filter((i) => i.id !== resumeId)
            if (state.currentResumeId === resumeId) {
              state.currentResumeId = state.resumes[0]?.id ?? ''
            }
          })
        )
      },
      newResume: () => {
        set(
          produce((state: StoreState) => {
            const newId = nanoid()
            state.resumes.unshift({ id: newId, resumeContent: simpleResumeContent, styleContent: '' })
            state.currentResumeId = newId
          })
        )
      },
    }),
    {
      name: 'store',
      version: 6,
      migrate: (persistedState, version) => {
        let currentVersion = version
        if (currentVersion === 5) {
          const draftId = nanoid()
          persistedState.resumes = [{ ...persistedState, id: draftId }, ...defaultResumes] as ResumeItem[]
          persistedState.currentResumeId = draftId
          currentVersion = 6
        }
        return persistedState as StoreState
      },
    }
  )
)

export const usePersistedStore = createTrackedSelector(useStore)

export const useCurrentDraft = () => {
  return useStore(
    useCallback(({ currentResumeId, resumes }) => {
      let result = resumes[0] || defaultResume
      for (const resume of resumes) {
        if (resume.id === currentResumeId) {
          result = resume
          break
        }
      }
      return { ...result, styleContent: result.styleContent || defaultResume.styleContent }
    }, [])
  )
}
