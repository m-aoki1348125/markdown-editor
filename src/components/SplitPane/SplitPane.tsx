import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import styles from './SplitPane.module.css'

interface SplitPaneProps {
  left: ReactNode
  right: ReactNode
}

export function SplitPane({ left, right }: SplitPaneProps) {
  const [splitPosition, setSplitPosition] = useState(50)
  const isDragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setSplitPosition(Math.max(20, Math.min(80, pct)))
    }

    const handleMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.pane} style={{ width: `${splitPosition}%` }}>
        {left}
      </div>
      <div className={styles.divider} onMouseDown={handleMouseDown}>
        <div className={styles.dividerLine} />
      </div>
      <div className={styles.pane} style={{ width: `${100 - splitPosition}%` }}>
        {right}
      </div>
    </div>
  )
}
