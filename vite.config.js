import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'development' ? '/NestMovie/' : '/',
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
});