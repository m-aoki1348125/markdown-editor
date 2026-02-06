import { useState, useRef, useEffect } from 'react'
import { EditorView } from '@codemirror/view'
import type { CursorPosition } from './types/index.ts'
import { useTheme } from './hooks/useTheme.ts'
import { useMarkdownDocument } from './hooks/useMarkdownDocument.ts'
import { useFileOperations } from './hooks/useFileOperations.ts'
import { useWordCount } from './hooks/useWordCount.ts'
import { useDebounce } from './hooks/useDebounce.ts'
import { Toolbar } from './components/Toolbar/Toolbar.tsx'
import { SplitPane } from './components/SplitPane/SplitPane.tsx'
import { Editor } from './components/Editor/Editor.tsx'
import { Preview } from './components/Preview/Preview.tsx'
import { StatusBar } from './components/StatusBar/StatusBar.tsx'
import styles from './App.module.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { doc, updateContent, markSaved, loadDocument, newDocument } = useMarkdownDocument()
  const { handleNew, handleOpen, handleSave } = useFileOperations(doc, {
    markSaved,
    loadDocument,
    newDocument,
  })
  const debouncedContent = useDebounce(doc.content, 150)
  const wordCount = useWordCount(doc.content)
  const [cursor, setCursor] = useState<CursorPosition>({ line: 1, column: 1 })
  const editorViewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    const title = `${doc.isDirty ? '* ' : ''}${doc.fileName} - Markdown Editor`
    document.title = title
    window.electronAPI?.setTitle(title)
  }, [doc.fileName, doc.isDirty])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (doc.isDirty) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [doc.isDirty])

  return (
    <div className={styles.app}>
      <Toolbar
        editorView={editorViewRef.current}
        fileName={doc.fileName}
        isDirty={doc.isDirty}
        theme={theme}
        onThemeToggle={toggleTheme}
        onNew={handleNew}
        onOpen={handleOpen}
        onSave={handleSave}
      />
      <SplitPane
        left={
          <Editor
            content={doc.content}
            theme={theme}
            onChange={updateContent}
            onCursorChange={setCursor}
            editorViewRef={editorViewRef}
          />
        }
        right={<Preview content={debouncedContent} />}
      />
      <StatusBar wordCount={wordCount} cursor={cursor} />
    </div>
  )
}
