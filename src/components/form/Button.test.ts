import { test as fact, expect } from "vitest";
import { render, screen } from "@testing-library/vue";

import Button from "./Button.vue";

fact("has a class by default", () => {
  // ARRANGE
  render(Button);

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute(
    "class",
    "vue-aria-Button"
  );
});
