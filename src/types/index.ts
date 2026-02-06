export interface DocumentState {
  content: string
  fileName: string
  isDirty: boolean
  fileHandle: FileSystemFileHandle | null
}

export type Theme = 'light' | 'dark'

export interface WordCountInfo {
  words: number
  characters: number
  lines: number
  readingTime: string
}

export type EditorActionType =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'code'
  | 'codeBlock'
  | 'link'
  | 'image'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'unorderedList'
  | 'orderedList'
  | 'taskList'
  | 'quote'
  | 'horizontalRule'
  | 'table'

export interface CursorPosition {
  line: number
  column: number
}
