import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./context/AuthProvider";
import { AcountProvider } from "./context/AcountProvider";
import { CategoryProvider } from "./context/CategoryProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AcountProvider>
          <CategoryProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </CategoryProvider>
        </AcountProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
