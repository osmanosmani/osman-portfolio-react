import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/index.css'
import { legacyHashDestination } from './utils/navigation'

const destination = legacyHashDestination(window.location.pathname, window.location.hash)
if (destination) window.history.replaceState(null, '', destination)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
