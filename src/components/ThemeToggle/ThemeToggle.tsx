import { Sun, Moon } from 'lucide-react'
import type { Theme } from '../../types/index.ts'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={theme === 'light' ? 'ダークモードに切替' : 'ライトモードに切替'}
      title={theme === 'light' ? 'ダークモードに切替' : 'ライトモードに切替'}
    >
      <span className={styles.iconWrapper} key={theme}>
        {theme === 'light' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
      </span>
    </button>
  )
}
