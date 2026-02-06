import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { Compartment } from '@codemirror/state'

export const themeCompartment = new Compartment()

const baseThemeSpec = {
  '&': {
    height: '100%',
    fontSize: '14.5px',
    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  },
  '.cm-scroller': {
    overflow: 'auto',
    padding: '8px 0',
    fontFamily: 'inherit',
  },
  '.cm-content': {
    padding: '0 16px',
    caretColor: 'var(--color-accent)',
    minHeight: '100%',
  },
  '.cm-gutters': {
    border: 'none',
    minWidth: '48px',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 8px 0 12px',
    fontSize: '13px',
  },
  '.cm-line': {
    padding: '1px 0',
  },
  '.cm-cursor': {
    borderLeftWidth: '2px',
    borderLeftColor: 'var(--color-accent)',
  },
  '&.cm-focused .cm-matchingBracket': {
    backgroundColor: 'var(--color-accent-subtle)',
    outline: '1px solid var(--color-accent)',
    borderRadius: '2px',
  },
  '.cm-selectionMatch': {
    backgroundColor: 'var(--color-accent-subtle)',
  },
  '.cm-foldPlaceholder': {
    background: 'var(--color-bg-tertiary)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '0 4px',
    margin: '0 2px',
  },
}

export const lightEditorTheme = EditorView.theme(
  {
    ...baseThemeSpec,
    '&': {
      ...baseThemeSpec['&'],
      backgroundColor: '#ffffff',
      color: '#1a1a2e',
    },
    '.cm-gutters': {
      ...baseThemeSpec['.cm-gutters'],
      backgroundColor: '#f8f9fa',
      color: '#868e96',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#f1f3f5',
      color: '#495057',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      backgroundColor: '#dbe4ff !important',
    },
  },
  { dark: false },
)

export const darkEditorTheme = EditorView.theme(
  {
    ...baseThemeSpec,
    '&': {
      ...baseThemeSpec['&'],
      backgroundColor: '#0d1117',
      color: '#e6edf3',
    },
    '.cm-gutters': {
      ...baseThemeSpec['.cm-gutters'],
      backgroundColor: '#161b22',
      color: '#6e7681',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#1c2129',
      color: '#8b949e',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      backgroundColor: 'rgba(56, 139, 253, 0.15) !important',
    },
  },
  { dark: true },
)

const lightHighlightStyle = HighlightStyle.define([
  { tag: tags.heading1, fontWeight: '700', fontSize: '1.4em', color: '#1a1a2e' },
  { tag: tags.heading2, fontWeight: '650', fontSize: '1.2em', color: '#1a1a2e' },
  { tag: tags.heading3, fontWeight: '600', fontSize: '1.1em', color: '#1a1a2e' },
  { tag: tags.strong, fontWeight: '700' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strikethrough, textDecoration: 'line-through', color: '#868e96' },
  { tag: tags.link, color: '#4263eb', textDecoration: 'underline' },
  { tag: tags.url, color: '#4263eb' },
  { tag: tags.monospace, fontFamily: 'inherit', color: '#e03131' },
  { tag: tags.meta, color: '#868e96' },
  { tag: tags.quote, color: '#495057', fontStyle: 'italic' },
  { tag: tags.processingInstruction, color: '#868e96' },
])

const darkHighlightStyle = HighlightStyle.define([
  { tag: tags.heading1, fontWeight: '700', fontSize: '1.4em', color: '#e6edf3' },
  { tag: tags.heading2, fontWeight: '650', fontSize: '1.2em', color: '#e6edf3' },
  { tag: tags.heading3, fontWeight: '600', fontSize: '1.1em', color: '#e6edf3' },
  { tag: tags.strong, fontWeight: '700' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strikethrough, textDecoration: 'line-through', color: '#6e7681' },
  { tag: tags.link, color: '#58a6ff', textDecoration: 'underline' },
  { tag: tags.url, color: '#58a6ff' },
  { tag: tags.monospace, fontFamily: 'inherit', color: '#f85149' },
  { tag: tags.meta, color: '#6e7681' },
  { tag: tags.quote, color: '#8b949e', fontStyle: 'italic' },
  { tag: tags.processingInstruction, color: '#6e7681' },
])

export function getThemeExtensions(isDark: boolean) {
  if (isDark) {
    return [darkEditorTheme, syntaxHighlighting(darkHighlightStyle)]
  }
  return [lightEditorTheme, syntaxHighlighting(lightHighlightStyle)]
}
