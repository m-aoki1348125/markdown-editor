import { useCallback, useEffect } from 'react'
import type { DocumentState } from '../types/index.ts'
import { openMarkdownFile, saveMarkdownFile } from '../utils/fileHelpers.ts'

interface Handlers {
  markSaved: (fileName: string, filePath: string | null) => void
  loadDocument: (content: string, fileName: string, filePath: string) => void
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
    if (result) handlers.loadDocument(result.content, result.name, result.filePath)
  }, [doc.isDirty, handlers])

  const handleSave = useCallback(async () => {
    const result = await saveMarkdownFile(doc.filePath, doc.content, doc.fileName)
    if (result) {
      handlers.markSaved(result.name, result.filePath)
    }
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
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        handleNew()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave, handleOpen, handleNew])

  return { handleNew, handleOpen, handleSave }
}
