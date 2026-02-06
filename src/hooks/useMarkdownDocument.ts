import { useState, useCallback } from 'react'
import type { DocumentState } from '../types/index.ts'
import { DEFAULT_CONTENT } from '../constants/defaultContent.ts'

export function useMarkdownDocument() {
  const [doc, setDoc] = useState<DocumentState>({
    content: DEFAULT_CONTENT,
    fileName: 'untitled.md',
    isDirty: false,
    filePath: null,
  })

  const updateContent = useCallback((content: string) => {
    setDoc((prev) => ({ ...prev, content, isDirty: true }))
  }, [])

  const markSaved = useCallback((fileName: string, filePath: string | null) => {
    setDoc((prev) => ({ ...prev, isDirty: false, fileName, filePath }))
  }, [])

  const loadDocument = useCallback(
    (content: string, fileName: string, filePath: string) => {
      setDoc({ content, fileName, isDirty: false, filePath })
    },
    [],
  )

  const newDocument = useCallback(() => {
    setDoc({
      content: '',
      fileName: 'untitled.md',
      isDirty: false,
      filePath: null,
    })
  }, [])

  return { doc, updateContent, markSaved, loadDocument, newDocument }
}
