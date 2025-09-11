import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 开发环境代理 API 请求到后端
      '/api': {
        target: 'http://localhost:8123',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // 生产环境构建配置
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          vendor: ['vue', 'vue-router', 'axios']
        }
      }
    }
  }
})