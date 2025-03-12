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

fact("renders with a custom class", () => {
  // ARRANGE
  render(Button, {
    props: {
      class: "custom-class",
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("class", "custom-class");
});

fact("supports DOM props", () => {
  // ARRANGE
  render(Button, {
    attrs: {
      "data-testid": "custom-id",
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute(
    "data-testid",
    "custom-id"
  );
});
