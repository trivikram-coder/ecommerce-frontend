import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/vikram-42-alla/vk-ecommerce', // Change "your-repo-name" to your actual GitHub repository name
});
