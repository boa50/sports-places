// vite.config.ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
        // ...,
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Adjust './src' if your source directory is different
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            enabled: true, // Enable coverage
            provider: 'v8', // or 'istanbul'
            reporter: ['text', 'html'], // Output reports in text and HTML format
            include: ['src/**/*.tsx'], // Specify files to include in coverage
            exclude: [
                'src/test/*',
                'src/types/*',
                'src/routes/__root.tsx',
                'src/main.tsx',
            ], // Specify files to exclude from coverage
            thresholds: {
                global: {
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    statements: 80,
                },
            },
        },
    },
})
