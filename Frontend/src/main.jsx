import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='118728053863-pe11drp3ld3ssn7qk1bkqusioujmsq0u.apps.googleusercontent.com'>
       <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
