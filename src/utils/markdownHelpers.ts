import type { EditorActionType } from '../types/index.ts'

interface ActionResult {
  text: string
  selectionStart: number
  selectionEnd: number
}

function wrapSelection(
  before: string,
  after: string,
  selectedText: string,
  from: number,
): ActionResult {
  if (selectedText) {
    const text = `${before}${selectedText}${after}`
    return {
      text,
      selectionStart: from + before.length,
      selectionEnd: from + before.length + selectedText.length,
    }
  }
  const placeholder = 'テキスト'
  const text = `${before}${placeholder}${after}`
  return {
    text,
    selectionStart: from + before.length,
    selectionEnd: from + before.length + placeholder.length,
  }
}

function prefixLines(
  prefix: string,
  selectedText: string,
  from: number,
): ActionResult {
  if (selectedText) {
    const lines = selectedText.split('\n')
    const prefixed = lines.map((line) => `${prefix}${line}`).join('\n')
    return {
      text: prefixed,
      selectionStart: from,
      selectionEnd: from + prefixed.length,
    }
  }
  const text = `${prefix}`
  return {
    text,
    selectionStart: from + text.length,
    selectionEnd: from + text.length,
  }
}

function insertSnippet(
  snippet: string,
  cursorOffset: number,
  from: number,
): ActionResult {
  return {
    text: snippet,
    selectionStart: from + cursorOffset,
    selectionEnd: from + cursorOffset,
  }
}

function prefixNumberedLines(
  selectedText: string,
  from: number,
): ActionResult {
  if (selectedText) {
    const lines = selectedText.split('\n')
    const prefixed = lines.map((line, i) => `${i + 1}. ${line}`).join('\n')
    return {
      text: prefixed,
      selectionStart: from,
      selectionEnd: from + prefixed.length,
    }
  }
  const text = '1. '
  return {
    text,
    selectionStart: from + text.length,
    selectionEnd: from + text.length,
  }
}

export function applyMarkdownAction(
  action: EditorActionType,
  selectedText: string,
  from: number,
): ActionResult {
  switch (action) {
    case 'bold':
      return wrapSelection('**', '**', selectedText, from)
    case 'italic':
      return wrapSelection('*', '*', selectedText, from)
    case 'strikethrough':
      return wrapSelection('~~', '~~', selectedText, from)
    case 'code':
      return wrapSelection('`', '`', selectedText, from)
    case 'codeBlock': {
      const lang = 'language'
      const snippet = selectedText
        ? `\n\`\`\`\n${selectedText}\n\`\`\`\n`
        : `\n\`\`\`${lang}\n\n\`\`\`\n`
      const offset = selectedText
        ? snippet.length
        : 4 + lang.length + 1
      return insertSnippet(snippet, offset, from)
    }
    case 'link': {
      if (selectedText) {
        const text = `[${selectedText}](url)`
        return {
          text,
          selectionStart: from + selectedText.length + 3,
          selectionEnd: from + selectedText.length + 6,
        }
      }
      const snippet = '[リンクテキスト](url)'
      return {
        text: snippet,
        selectionStart: from + 1,
        selectionEnd: from + 7,
      }
    }
    case 'image': {
      const snippet = '![alt](image-url)'
      return {
        text: snippet,
        selectionStart: from + 2,
        selectionEnd: from + 5,
      }
    }
    case 'heading1':
      return prefixLines('# ', selectedText, from)
    case 'heading2':
      return prefixLines('## ', selectedText, from)
    case 'heading3':
      return prefixLines('### ', selectedText, from)
    case 'unorderedList':
      return prefixLines('- ', selectedText, from)
    case 'orderedList':
      return prefixNumberedLines(selectedText, from)
    case 'taskList':
      return prefixLines('- [ ] ', selectedText, from)
    case 'quote':
      return prefixLines('> ', selectedText, from)
    case 'horizontalRule':
      return insertSnippet('\n\n---\n\n', 5, from)
    case 'table': {
      const table = `\n| 列1 | 列2 | 列3 |\n|------|------|------|\n| セル | セル | セル |\n`
      return insertSnippet(table, table.length, from)
    }
  }
}
