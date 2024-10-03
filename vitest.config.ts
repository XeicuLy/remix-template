/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			provider: 'v8',
		},
		include: ['**/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)', '**/integration/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
	},
	resolve: {
		alias: {
			'@': `${__dirname}/app`,
		},
	},
});
