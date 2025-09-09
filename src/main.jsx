import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router'
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <AuthContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AuthContextProvider>
    </>
  </StrictMode>,
)
