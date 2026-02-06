import { useMemo } from 'react'
import type { WordCountInfo } from '../types/index.ts'

export function useWordCount(content: string): WordCountInfo {
  return useMemo(() => {
    const trimmed = content.trim()
    if (!trimmed) {
      return { words: 0, characters: 0, lines: 0, readingTime: '0 min' }
    }
    const words = trimmed.split(/\s+/).length
    const characters = trimmed.length
    const lines = content.split('\n').length
    const readingTime = `${Math.max(1, Math.ceil(words / 200))} min`
    return { words, characters, lines, readingTime }
  }, [content])
}
