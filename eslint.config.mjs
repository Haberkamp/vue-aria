// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vitest from "eslint-plugin-vitest";

export default tseslint.config(
  {
    ignores: ["docs/**"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.test.{ts,tsx,js,jsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      "vitest/max-nested-describe": ["error", { max: 3 }], // you can also modify rules' behavior using option like this
    },
  }
);
