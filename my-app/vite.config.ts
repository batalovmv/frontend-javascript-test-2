import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/frontend-javascript-test-2/',
  plugins: [react()],
    preview:{
        host:true,
        port:8080
    }
})
