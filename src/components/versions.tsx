import clsx from 'clsx'
import { memo } from 'react'
import IconAdd from '~icons/carbon/add'
import IconDelete from '~icons/carbon/delete'
import { useParseHTMLConfig, usePersistedStore } from '@/hooks'
import type { ResumeItem } from '@/hooks'

function VersionCard(props: { item: ResumeItem }) {
  const { item } = props
  const config = useParseHTMLConfig(props.item.resumeContent)
  const store = usePersistedStore()

  const isEditing = store.currentResumeId === item.id

  const onSwitch = () => {
    if (isEditing) return
    store.startEditing(item.id)
  }

  return (
    // FIXME: use headlessui react
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={clsx(
        'hover:bg-light-600 dark:hover:bg-dark-600 text-dark-500 dark:text-light-400 w-50 cursor-pointer overflow-hidden rounded px-2 py-2 transition',
        isEditing && 'bg-light-500 dark:bg-dark-600 font-bold'
      )}
      onClick={onSwitch}
      role="button"
      tabIndex={-1}
    >
      <div className="flex items-center whitespace-nowrap">
        <div className="text overflow-hidden overflow-ellipsis">{config.title ?? '未命名'}</div>
        <button
          className="ml-auto"
          hidden={store.resumes.length === 1}
          onClick={(e) => {
            e.stopPropagation()
            store.deleteResume(item.id)
          }}
          type="button"
        >
          <IconDelete className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </div>
  )
}

export const Versions = memo(function Versions() {
  const { resumes, newResume } = usePersistedStore()

  return (
    <div
      className="max-h-100 grid gap-2 overflow-auto p-2"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
    >
      <button
        className="hover:bg-light-600 dark:hover:bg-dark-600  w-50 cursor-pointer overflow-hidden rounded px-2 py-2 transition"
        onClick={newResume}
        type="button"
      >
        <div className="flex items-center whitespace-nowrap text-blue-500">
          <IconAdd className="mr-1 h-5 w-5" />
          <div className="text overflow-hidden overflow-ellipsis font-bold">创建空白简历</div>
        </div>
      </button>
      {resumes.map((v) => (
        <VersionCard item={v} key={v.id} />
      ))}
    </div>
  )
})
