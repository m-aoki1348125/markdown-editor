import { useRef, useEffect, type MutableRefObject } from 'react'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import type { Theme, CursorPosition } from '../../types/index.ts'
import { createEditorExtensions } from './editorSetup.ts'
import { themeCompartment, getThemeExtensions } from './editorTheme.ts'
import styles from './Editor.module.css'

interface EditorProps {
  content: string
  theme: Theme
  onChange: (value: string) => void
  onCursorChange: (pos: CursorPosition) => void
  editorViewRef: MutableRefObject<EditorView | null>
}

export function Editor({ content, theme, onChange, onCursorChange, editorViewRef }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)
  const onCursorRef = useRef(onCursorChange)
  onChangeRef.current = onChange
  onCursorRef.current = onCursorChange

  const initialContentRef = useRef(content)
  const initialThemeRef = useRef(theme)

  useEffect(() => {
    if (!containerRef.current) return

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString())
      }
      if (update.selectionSet || update.docChanged) {
        const pos = update.state.selection.main.head
        const line = update.state.doc.lineAt(pos)
        onCursorRef.current({ line: line.number, column: pos - line.from + 1 })
      }
    })

    const view = new EditorView({
      state: EditorState.create({
        doc: initialContentRef.current,
        extensions: [
          ...createEditorExtensions(),
          themeCompartment.of(getThemeExtensions(initialThemeRef.current === 'dark')),
          updateListener,
        ],
      }),
      parent: containerRef.current,
    })

    editorViewRef.current = view
    return () => {
      view.destroy()
      editorViewRef.current = null
    }
  }, [editorViewRef])

  useEffect(() => {
    const view = editorViewRef.current
    if (!view) return
    view.dispatch({
      effects: themeCompartment.reconfigure(getThemeExtensions(theme === 'dark')),
    })
  }, [theme, editorViewRef])

  useEffect(() => {
    const view = editorViewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== content) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: content },
      })
    }
  }, [content, editorViewRef])

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.label}>EDITOR</div>
      <div ref={containerRef} className={styles.editorContainer} />
    </div>
  )
}
