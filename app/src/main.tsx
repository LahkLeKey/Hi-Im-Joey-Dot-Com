import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import { appRouter } from './App.tsx'
import { TooltipProvider } from '@/components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={appRouter} />
    </TooltipProvider>
  </StrictMode>,
)
