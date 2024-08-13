import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { TransactionsContextProvider } from './contexts/TransactionsContextProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TransactionsContextProvider>
      <App />
    </TransactionsContextProvider>
  </React.StrictMode>,
)
