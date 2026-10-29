import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Browser tests in e2e/ are run by Playwright, not Vitest.
    include: ["src/**/*.test.ts"],
  },
});
