import { useState, useCallback } from 'react'
import type { DocumentState } from '../types/index.ts'
import { DEFAULT_CONTENT } from '../constants/defaultContent.ts'

export function useMarkdownDocument() {
  const [doc, setDoc] = useState<DocumentState>({
    content: DEFAULT_CONTENT,
    fileName: 'untitled.md',
    isDirty: false,
    fileHandle: null,
  })

  const updateContent = useCallback((content: string) => {
    setDoc((prev) => ({ ...prev, content, isDirty: true }))
  }, [])

  const markSaved = useCallback((fileName: string, handle: FileSystemFileHandle | null) => {
    setDoc((prev) => ({ ...prev, isDirty: false, fileName, fileHandle: handle }))
  }, [])

  const loadDocument = useCallback(
    (content: string, fileName: string, handle: FileSystemFileHandle) => {
      setDoc({ content, fileName, isDirty: false, fileHandle: handle })
    },
    [],
  )

  const newDocument = useCallback(() => {
    setDoc({
      content: '',
      fileName: 'untitled.md',
      isDirty: false,
      fileHandle: null,
    })
  }, [])

  return { doc, updateContent, markSaved, loadDocument, newDocument }
}
