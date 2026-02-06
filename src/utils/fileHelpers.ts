export async function openMarkdownFile(): Promise<{
  content: string
  filePath: string
  name: string
} | null> {
  return window.electronAPI.fileOpen()
}

export async function saveMarkdownFile(
  filePath: string | null,
  content: string,
  suggestedName?: string,
): Promise<{ filePath: string; name: string } | null> {
  try {
    if (filePath) {
      return window.electronAPI.fileSave({ filePath, content })
    }
    return window.electronAPI.fileSaveAs({
      content,
      suggestedName: suggestedName || 'untitled.md',
    })
  } catch {
    return null
  }
}
