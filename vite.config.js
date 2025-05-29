import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [tailwindcss(), react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@data': path.resolve(__dirname, './src/data'),
            '@styles': path.resolve(__dirname, './src/assets/styles'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@videos': path.resolve(__dirname, './src/assets/videos'),
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
});
