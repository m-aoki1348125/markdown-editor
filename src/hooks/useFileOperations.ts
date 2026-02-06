import { useCallback, useEffect } from 'react'
import type { DocumentState } from '../types/index.ts'
import { openMarkdownFile, saveMarkdownFile } from '../utils/fileHelpers.ts'

interface Handlers {
  markSaved: (fileName: string, handle: FileSystemFileHandle | null) => void
  loadDocument: (content: string, fileName: string, handle: FileSystemFileHandle) => void
  newDocument: () => void
}

export function useFileOperations(doc: DocumentState, handlers: Handlers) {
  const handleNew = useCallback(() => {
    if (doc.isDirty && !confirm('変更が保存されていません。破棄しますか？')) return
    handlers.newDocument()
  }, [doc.isDirty, handlers])

  const handleOpen = useCallback(async () => {
    if (doc.isDirty && !confirm('変更が保存されていません。破棄しますか？')) return
    const result = await openMarkdownFile()
    if (result) handlers.loadDocument(result.content, result.name, result.handle)
  }, [doc.isDirty, handlers])

  const handleSave = useCallback(async () => {
    const handle = await saveMarkdownFile(doc.fileHandle, doc.content, doc.fileName)
    const name = handle ? (await handle.getFile()).name : doc.fileName
    handlers.markSaved(name, handle)
  }, [doc, handlers])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault()
        handleOpen()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave, handleOpen])

  return { handleNew, handleOpen, handleSave }
}
