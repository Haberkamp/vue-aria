import { test as fact, expect, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";

import Button from "./Button.vue";
import { defineComponent } from "vue";

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

fact("supports from props", () => {
  // ARRANGE
  const Parent = defineComponent({
    template: '<form id="foo"><Button form="foo" formMethod="post" /></form>',
  });

  render(Parent);

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("form", "foo");
  expect(screen.getByRole("button")).toHaveAttribute("formMethod", "post");
});

fact("supports accessibility props", () => {
  // ARRANGE
  render(Button, {
    attrs: {
      "aria-label": "custom-label",
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-label",
    "custom-label"
  );
});

fact("emits a hoverStart event when hovering over the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: {
      onHoverStart: handler,
    },
  });

  // ACT
  await userEvent.hover(screen.getByRole("button"));

  // ASSERT
  expect(emitted("hoverStart")).toBeDefined();
  expect(handler).toHaveBeenCalled();
});

fact("emits a mouseover event when hovering over the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    attrs: {
      onMouseover: handler,
    },
  });

  // ACT
  await userEvent.hover(screen.getByRole("button"));

  // ASSERT
  expect(emitted("mouseover")).toBeDefined();
  expect(handler).toHaveBeenCalled();
});

fact("emits a hoverEnd event when unhovering the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    attrs: {
      onMouseout: handler,
    },
  });

  // ACT
  await userEvent.unhover(screen.getByRole("button"));

  // ASSERT
  expect(emitted("hoverEnd")).toBeDefined();
  expect(handler).toHaveBeenCalled();
});

fact("emits a mouseleave event when unhovering the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    attrs: {
      onMouseleave: handler,
    },
  });

  // ACT
  await userEvent.unhover(screen.getByRole("button"));

  // ASSERT
  expect(emitted("mouseleave")).toBeDefined();
  expect(handler).toHaveBeenCalled();
});

fact("emits a hoverChange event when hovering over the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    attrs: {
      onHoverChange: handler,
    },
  });

  // ACT
  await userEvent.hover(screen.getByRole("button"));

  // ASSERT
  expect(emitted("hoverChange")).toBeDefined();
  expect(handler).toHaveBeenCalledExactlyOnceWith(true, expect.any(MouseEvent));
});

fact("emits a hoverChange event when unhovering the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    attrs: {
      onHoverChange: handler,
    },
  });

  // ACT
  await userEvent.unhover(screen.getByRole("button"));

  // ASSERT
  expect(emitted("hoverChange")).toBeDefined();
  expect(handler).toHaveBeenCalledExactlyOnceWith(
    false,
    expect.any(MouseEvent)
  );
});
