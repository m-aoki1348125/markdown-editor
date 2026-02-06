import { useCallback } from 'react'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Code,
  Braces,
  Quote,
  Link,
  Image,
  Table,
  Minus,
  FilePlus,
  FolderOpen,
  Save,
  type LucideIcon,
} from 'lucide-react'
import type { EditorView } from '@codemirror/view'
import type { Theme, EditorActionType } from '../../types/index.ts'
import { applyMarkdownAction } from '../../utils/markdownHelpers.ts'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.tsx'
import styles from './Toolbar.module.css'

interface ToolbarProps {
  editorView: EditorView | null
  fileName: string
  isDirty: boolean
  theme: Theme
  onThemeToggle: () => void
  onNew: () => void
  onOpen: () => void
  onSave: () => void
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon
  label: string
  onClick: () => void
}) {
  return (
    <button className={styles.button} onClick={onClick} title={label} aria-label={label}>
      <Icon size={17} strokeWidth={1.75} />
    </button>
  )
}

function ToolbarDivider() {
  return <div className={styles.divider} />
}

export function Toolbar({
  editorView,
  fileName,
  isDirty,
  theme,
  onThemeToggle,
  onNew,
  onOpen,
  onSave,
}: ToolbarProps) {
  const applyAction = useCallback(
    (action: EditorActionType) => {
      if (!editorView) return
      const { state } = editorView
      const { from, to } = state.selection.main
      const selectedText = state.sliceDoc(from, to)
      const result = applyMarkdownAction(action, selectedText, from)
      editorView.dispatch({
        changes: { from, to, insert: result.text },
        selection: { anchor: result.selectionStart, head: result.selectionEnd },
      })
      editorView.focus()
    },
    [editorView],
  )

  return (
    <header className={styles.toolbar}>
      <div className={styles.fileSection}>
        <div className={styles.logoMark}>M</div>
        <span className={styles.fileName}>
          {isDirty && <span className={styles.dirtyDot} />}
          {fileName}
        </span>
      </div>

      <div className={styles.formatSection}>
        <ToolbarButton icon={Bold} label="太字 (Ctrl+B)" onClick={() => applyAction('bold')} />
        <ToolbarButton icon={Italic} label="斜体 (Ctrl+I)" onClick={() => applyAction('italic')} />
        <ToolbarButton
          icon={Strikethrough}
          label="取り消し線"
          onClick={() => applyAction('strikethrough')}
        />
        <ToolbarDivider />
        <ToolbarButton icon={Heading1} label="見出し1" onClick={() => applyAction('heading1')} />
        <ToolbarButton icon={Heading2} label="見出し2" onClick={() => applyAction('heading2')} />
        <ToolbarButton icon={Heading3} label="見出し3" onClick={() => applyAction('heading3')} />
        <ToolbarDivider />
        <ToolbarButton
          icon={List}
          label="箇条書きリスト"
          onClick={() => applyAction('unorderedList')}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="番号付きリスト"
          onClick={() => applyAction('orderedList')}
        />
        <ToolbarButton
          icon={ListChecks}
          label="タスクリスト"
          onClick={() => applyAction('taskList')}
        />
        <ToolbarDivider />
        <ToolbarButton
          icon={Code}
          label="インラインコード"
          onClick={() => applyAction('code')}
        />
        <ToolbarButton
          icon={Braces}
          label="コードブロック"
          onClick={() => applyAction('codeBlock')}
        />
        <ToolbarButton icon={Quote} label="引用" onClick={() => applyAction('quote')} />
        <ToolbarDivider />
        <ToolbarButton icon={Link} label="リンク" onClick={() => applyAction('link')} />
        <ToolbarButton icon={Image} label="画像" onClick={() => applyAction('image')} />
        <ToolbarButton icon={Table} label="テーブル" onClick={() => applyAction('table')} />
        <ToolbarButton
          icon={Minus}
          label="水平線"
          onClick={() => applyAction('horizontalRule')}
        />
      </div>

      <div className={styles.actionsSection}>
        <ToolbarButton icon={FilePlus} label="新規 (Ctrl+N)" onClick={onNew} />
        <ToolbarButton icon={FolderOpen} label="開く (Ctrl+O)" onClick={onOpen} />
        <ToolbarButton icon={Save} label="保存 (Ctrl+S)" onClick={onSave} />
        <ToolbarDivider />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </header>
  )
}
