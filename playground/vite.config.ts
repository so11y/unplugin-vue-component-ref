import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePlugin } from '../node_/index';
import type { FilterPattern } from '@rollup/pluginutils';
interface Options {
	include?: FilterPattern;
	exclude?: FilterPattern;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vitePlugin({ /* options */ }) ]
})
