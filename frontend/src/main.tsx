import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./auth/AuthContext";
import { Toaster } from "react-hot-toast";
import './index.css';
import './styles/main.css';
import App from './App.tsx';

createRoot(document.getElementById("root")!).render(

  <StrictMode>

      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #334155",
            },
          }}
        />

        <App />

      </AuthProvider>

  </StrictMode>

);