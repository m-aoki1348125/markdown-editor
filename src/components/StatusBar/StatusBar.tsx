import type { WordCountInfo, CursorPosition } from '../../types/index.ts'
import styles from './StatusBar.module.css'

interface StatusBarProps {
  wordCount: WordCountInfo
  cursor: CursorPosition
}

export function StatusBar({ wordCount, cursor }: StatusBarProps) {
  return (
    <footer className={styles.statusBar}>
      <div className={styles.left}>
        <span>Ln {cursor.line}, Col {cursor.column}</span>
      </div>
      <div className={styles.right}>
        <span>{wordCount.words} words</span>
        <span className={styles.separator}>|</span>
        <span>{wordCount.characters} chars</span>
        <span className={styles.separator}>|</span>
        <span>{wordCount.lines} lines</span>
        <span className={styles.separator}>|</span>
        <span>{wordCount.readingTime} read</span>
      </div>
    </footer>
  )
}
