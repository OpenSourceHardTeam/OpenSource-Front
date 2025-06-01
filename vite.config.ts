import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths({
      projects: ["tsconfig.app.json"],
    }),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: "**/*.svg?react",
    }),
  ],
});
