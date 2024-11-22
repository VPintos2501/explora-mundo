import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/explora-mundo/', // Nombre del repositorio en GitHub
});
