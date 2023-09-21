import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {SnackbarProvider} from 'notistack'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </BrowserRouter>
)

// now we have access to react-router-dom on all project