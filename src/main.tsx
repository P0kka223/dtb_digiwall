import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store.tsx'
import axios from 'axios' 

axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
axios.defaults.headers.common["Content-Type"] = "application/json";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
