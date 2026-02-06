import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  fileOpen: (): Promise<{ content: string; filePath: string; name: string } | null> =>
    ipcRenderer.invoke('file:open'),

  fileSave: (args: { filePath: string; content: string }): Promise<{ filePath: string; name: string }> =>
    ipcRenderer.invoke('file:save', args),

  fileSaveAs: (args: { content: string; suggestedName: string }): Promise<{ filePath: string; name: string } | null> =>
    ipcRenderer.invoke('file:saveAs', args),

  setTitle: (title: string): Promise<void> =>
    ipcRenderer.invoke('app:setTitle', title),
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
