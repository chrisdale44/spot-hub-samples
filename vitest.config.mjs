import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use global `describe`, `test`, `expect`
    environment: "jsdom", // Simulate browser env for React
    setupFiles: "./test/setup.js", // Optional: global test setup
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"], // Test file patterns
    exclude: ["**/node_modules/**", "**/dist/**", "/ignore/*"], // Exclude node_modules and dist
    alias: { "@/": new URL("./src/", import.meta.url).pathname },
  },
});
