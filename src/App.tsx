import { Toast } from './components/common/Toast'
import { ConfigPanel } from './components/config/ConfigPanel'
import { AppShell } from './components/layout/AppShell'
import { SplitPane } from './components/layout/SplitPane'
import { TopActionBar } from './components/layout/TopActionBar'
import { PreviewPanel } from './components/preview/PreviewPanel'
import { usePromptStore } from './store/promptStore'

function App() {
  const toastMessage = usePromptStore((state) => state.toastMessage)
  const hideToast = usePromptStore((state) => state.hideToast)

  return (
    <AppShell>
      <TopActionBar />
      <SplitPane left={<ConfigPanel />} right={<PreviewPanel />} />
      <Toast message={toastMessage} onClose={hideToast} />
    </AppShell>
  )
}

export default App
