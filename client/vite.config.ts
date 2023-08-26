import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: PORT,
    hmr: {
      overlay: false,
      host: "localhost",
      protocol: "ws",
      clientPort: PORT
    },
    watch: {
      usePolling: true
    }
  }
});
