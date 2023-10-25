import netlifyAdapter from "@marko/run-adapter-netlify";
import marko from "@marko/run/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    marko({ adapter: netlifyAdapter({ edge: true }) }),
    tsconfigPaths(),
  ],
});
