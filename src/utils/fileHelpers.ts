const markdownTypes = [
  {
    description: 'Markdown Files',
    accept: { 'text/markdown': ['.md', '.markdown'] as `.${string}`[] },
  },
]

export async function openMarkdownFile(): Promise<{
  content: string
  handle: FileSystemFileHandle
  name: string
} | null> {
  try {
    if (!('showOpenFilePicker' in window)) {
      return openMarkdownFileFallback()
    }
    const [handle] = await window.showOpenFilePicker({
      types: markdownTypes,
      multiple: false,
    })
    const file = await handle.getFile()
    const content = await file.text()
    return { content, handle, name: file.name }
  } catch {
    return null
  }
}

function openMarkdownFileFallback(): Promise<{
  content: string
  handle: FileSystemFileHandle
  name: string
} | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.markdown,text/markdown'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) {
        resolve(null)
        return
      }
      const content = await file.text()
      resolve({ content, handle: null as unknown as FileSystemFileHandle, name: file.name })
    }
    input.oncancel = () => resolve(null)
    input.click()
  })
}

export async function saveMarkdownFile(
  handle: FileSystemFileHandle | null,
  content: string,
  suggestedName?: string,
): Promise<FileSystemFileHandle | null> {
  try {
    if (!('showSaveFilePicker' in window) || !('createWritable' in FileSystemFileHandle.prototype)) {
      saveMarkdownFileFallback(content, suggestedName || 'untitled.md')
      return null
    }
    const h =
      handle ??
      (await window.showSaveFilePicker({
        suggestedName: suggestedName || 'untitled.md',
        types: markdownTypes,
      }))
    const writable = await h.createWritable()
    await writable.write(content)
    await writable.close()
    return h
  } catch {
    return null
  }
}

function saveMarkdownFileFallback(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
