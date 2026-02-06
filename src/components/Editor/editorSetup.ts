import { keymap, EditorView } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
} from '@codemirror/language'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { closeBrackets } from '@codemirror/autocomplete'
import type { Extension } from '@codemirror/state'

export function createEditorExtensions(): Extension[] {
  return [
    history(),
    markdown({ base: markdownLanguage }),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    bracketMatching(),
    closeBrackets(),
    highlightSelectionMatches(),
    keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap, indentWithTab]),
    EditorView.lineWrapping,
  ]
}
