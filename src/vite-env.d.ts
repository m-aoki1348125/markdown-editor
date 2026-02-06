/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

interface ElectronAPI {
  fileOpen: () => Promise<{ content: string; filePath: string; name: string } | null>
  fileSave: (args: { filePath: string; content: string }) => Promise<{ filePath: string; name: string }>
  fileSaveAs: (args: { content: string; suggestedName: string }) => Promise<{ filePath: string; name: string } | null>
  setTitle: (title: string) => Promise<void>
}

interface Window {
  electronAPI: ElectronAPI
}
