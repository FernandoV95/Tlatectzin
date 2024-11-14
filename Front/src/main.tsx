import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Cafetera.css'
import './Taza.css'
import Router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <Router>
      </Router> 
    </QueryClientProvider>

  </StrictMode>,
)
