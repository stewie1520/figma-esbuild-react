import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: "./ui-src",
    plugins: [reactRefresh(), viteSingleFile()],
    define: {
      REACT_APP_API_DNS: JSON.stringify(env.REACT_APP_API_DNS),
      NODE_ENV: JSON.stringify(env.NODE_ENV)
    },
    build: {
      target: "esnext",
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      brotliSize: false,
      outDir: "../dist",
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          manualChunks: () => "everything.js",
        },
      },
    },
  }
});
