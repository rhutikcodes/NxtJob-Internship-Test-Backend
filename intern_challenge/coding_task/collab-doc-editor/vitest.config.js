// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		setupFiles: './src/test/vitest.setup.js',
		environment: 'node', // or 'jsdom', depending on your needs
		globals: true, // if you need to use global variables
	},
	env: {
		DATABASE_URL: process.env.DATABASE_URL || 'your_default_test_database_url',
	},
});
