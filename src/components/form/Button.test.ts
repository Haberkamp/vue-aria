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
    components: {
      Button,
    },
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
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
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
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
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
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
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
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
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

fact("does not have a data-hovered attribute by default", () => {
  // ARRANGE
  render(Button);

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveAttribute("data-hovered");
});

fact(
  "adds a data-hovered attribute when hovering over the button",
  async () => {
    // ARRANGE
    render(Button);

    // ACT
    await userEvent.hover(screen.getByRole("button"));

    // ASSERT
    expect(screen.getByRole("button")).toHaveAttribute("data-hovered", "true");
  }
);

fact(
  "removes the data-hovered attribute when unhovering the button",
  async () => {
    // ARRANGE
    render(Button);

    // ACT
    await userEvent.unhover(screen.getByRole("button"));

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveAttribute("data-hovered");
  }
);

fact("supports adding a class when hovering over the button", async () => {
  // ARRANGE
  render(Button, {
    props: {
      className: () => "custom-class",
    },
  });

  // ACT
  await userEvent.hover(screen.getByRole("button"));

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass(
    "custom-class vue-aria-Button"
  );
});

fact(
  "does not add the custom hover class when not hovering over the button",
  async () => {
    // ARRANGE
    render(Button, {
      props: {
        className: ({ isHovered }) => (isHovered ? "hover-class" : ""),
      },
    });

    // ACT
    await userEvent.unhover(screen.getByRole("button"));

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveClass("custom-class");
  }
);

fact("keeps the overwritten class when using a render prop", async () => {
  // ARRANGE
  render(Button, {
    props: {
      class: "default-class",
      className: () => "custom-class",
    },
  });

  // ACT
  await userEvent.hover(screen.getByRole("button"));

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass("custom-class default-class");
});

fact(
  "does not add a data-focus-visible attribute when the button is not focused",
  () => {
    // ARRANGE
    render(Button);

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveAttribute(
      "data-focus-visible"
    );
  }
);

fact(
  "adds a data-focus-visible attribute when the button is focused",
  async () => {
    // ARRANGE
    render(Button);

    // ACT
    await userEvent.click(screen.getByRole("button"));

    // ASSERT
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-focus-visible",
      "true"
    );
  }
);

fact(
  "removes the data-focus-visible attribute when the button gets blurred",
  async () => {
    // ARRANGE
    render(Button);
    await userEvent.tab();

    // ACT
    await userEvent.tab();

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveAttribute(
      "data-focus-visible"
    );
  }
);

fact("emits a focus event when the button is focused", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: {
      onFocus: handler,
    },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(emitted("focus")).toBeDefined();
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(FocusEvent));
});

fact("emits a blur event when the button is blurred", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: {
      onBlur: handler,
    },
  });

  await userEvent.tab();

  // ACT
  await userEvent.tab();

  // ASSERT
  expect(emitted("blur")).toBeDefined();
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(FocusEvent));
});

fact(
  "does not add a custom focus-visible class when the button is not focused",
  () => {
    // ARRANGE
    render(Button, {
      props: {
        className: ({ isFocusVisible }) =>
          isFocusVisible ? "custom-class" : "",
      },
    });

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveClass("custom-class");
    expect(screen.getByRole("button")).toHaveClass("vue-aria-Button");
  }
);

fact(
  "adds a custom focus-visible class when the button is focused",
  async () => {
    // ARRANGE
    render(Button, {
      props: {
        className: ({ isFocusVisible }) =>
          isFocusVisible ? "custom-class" : "",
      },
    });

    // ACT
    await userEvent.click(screen.getByRole("button"));

    // ASSERT
    expect(screen.getByRole("button")).toHaveClass(
      "custom-class vue-aria-Button"
    );
  }
);

fact("is enabled by default", () => {
  // ARRANGE
  render(Button);

  // ASSERT
  expect(screen.getByRole("button")).toBeEnabled();
});

fact("is disabled when the disabled prop is true", () => {
  // ARRANGE
  render(Button, {
    props: { disabled: true },
  });

  // ASSERT
  expect(screen.getByRole("button")).toBeDisabled();
});

fact("is enabled when the disabled prop is false", () => {
  // ARRANGE
  render(Button, {
    props: { disabled: false },
  });

  // ASSERT
  expect(screen.getByRole("button")).toBeEnabled();
});

fact("does not add a custom disabled class when the button is enabled", () => {
  // ARRANGE
  render(Button, {
    props: {
      className: ({ isDisabled }) => (isDisabled ? "custom-class" : ""),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveClass("custom-class");
});

fact("adds a custom disabled class when the button is disabled", () => {
  // ARRANGE
  render(Button, {
    props: {
      disabled: true,
      className: ({ isDisabled }) => (isDisabled ? "custom-class" : ""),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass("custom-class");
});

fact(
  "does not add a data-disabled attribute when the button is enabled",
  () => {
    // ARRANGE
    render(Button);

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveAttribute("data-disabled");
  }
);

fact("adds a data-disabled attribute when the button is disabled", () => {
  // ARRANGE
  render(Button, {
    props: { disabled: true },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("data-disabled", "true");
});

fact("supports scoped slots", () => {
  // ARRANGE
  render(Button, {
    slots: {
      default: ({ isDisabled }) => (isDisabled ? "Disabled" : "Enabled"),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveTextContent("Enabled");
});

fact("supports rendering button with a different HTML element", () => {
  // ARRANGE
  render(Button, {
    props: {
      is: "a",
    },
    attrs: {
      "data-testid": "link",
    },
  });

  // ASSERT
  expect(screen.getByTestId("link").tagName).toBe("A");
});

fact("does not have an href attribute by default", () => {
  // ARRANGE
  render(Button);

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveAttribute("href");
});

fact("supports having a href attribute", () => {
  // ARRANGE
  render(Button, {
    props: { href: "https://example.com", is: "a" },
  });

  // ASSERT
  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "https://example.com"
  );
});

fact("removes href when button is pending", () => {
  // ARRANGE
  render(Button, {
    props: {
      isPending: true,
      is: "a",
      href: "https://example.com",
    },
    attrs: {
      "data-testid": "link",
    },
  });

  // ASSERT
  expect(screen.getByTestId("link")).not.toHaveAttribute("href");
});

fact("shows a loading spinner when the button is pending", () => {
  // ARRANGE
  render(Button, {
    props: { isPending: true },
    slots: {
      default: ({ isPending }) => (isPending ? "Loading..." : "Click me"),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveTextContent("Loading...");
});

fact("keeps the focus when pending", async () => {
  // ARRANGE
  render(Button, {
    props: { isPending: true },
  });

  await userEvent.tab();

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(screen.getByRole("button")).toHaveFocus();
});

fact("is disabled to screen readers when pending", () => {
  // ARRANGE
  render(Button, {
    props: { isPending: true },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
});

fact("is not disabled to screen readers when not pending", () => {
  // ARRANGE
  render(Button, {
    props: { isPending: false },
  });

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveAttribute("aria-disabled");
});

fact("does not emit a onPress event when pending", async () => {
  // ARRANGE
  const handler = vi.fn();
  render(Button, {
    props: { isPending: true, onPress: handler },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(handler).not.toHaveBeenCalled();
});

fact("emits a press event when the button is clicked", async () => {
  // ARRANGE
  const handler = vi.fn();
  render(Button, {
    props: { onPress: handler },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
});

fact.each(["{Enter}", " "])(
  'does emit a press event when pressing "%s"',
  async (key) => {
    // ARRANGE
    const handler = vi.fn();
    render(Button, {
      props: { onPress: handler },
    });

    // ACT
    await userEvent.tab();
    await userEvent.keyboard(key);

    // ASSERT
    expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
  }
);

fact("adds a data-pending attribute when pending", () => {
  // ARRANGE
  render(Button, {
    props: { isPending: true },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("data-pending", "true");
});

fact("does not add a data-pending attribute when not pending", () => {
  // ARRANGE
  render(Button);

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveAttribute("data-pending");
});

fact(
  "does not add a data-focused attribute when the button is not focused",
  () => {
    // ARRANGE
    render(Button);

    // ASSERT
    expect(screen.getByRole("button")).not.toHaveAttribute("data-focused");
  }
);

fact("adds a data-focused attribute when the button is focused", async () => {
  // ARRANGE
  render(Button);

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("data-focused", "true");
});

fact("emits onClick event when clicking on the button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { onClick: handler },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
  expect(emitted("click")).toBeDefined();
});

fact(
  "do not emit onClick event when clicking on a disabled button",
  async () => {
    // ARRANGE
    const handler = vi.fn();
    const { emitted } = render(Button, {
      props: { disabled: true, onClick: handler },
    });

    // ACT
    await userEvent.click(screen.getByRole("button"));

    // ASSERT
    expect(handler).not.toHaveBeenCalled();
    expect(emitted("click")).toBeUndefined();
  }
);

fact("do not emit click event when clicking on isPending button", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { isPending: true, onClick: handler },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(handler).not.toHaveBeenCalled();
  expect(emitted("click")).toBeUndefined();
});

fact("emits keydown event when pressing a key", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { onKeydown: handler },
  });

  // ACT
  await userEvent.tab();
  await userEvent.keyboard("{a>}");

  // ASSERT
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(KeyboardEvent));
  expect(emitted("keydown")).toBeDefined();
});

fact("does not emit a keydown event when the button is pendign", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { isPending: true, onKeydown: handler },
  });

  // ACT
  await userEvent.tab();
  await userEvent.keyboard("{a>}");

  // ASSERT
  expect(handler).not.toHaveBeenCalled();
  expect(emitted("keydown")).toBeUndefined();
});

fact("emits a keyup event when releasing a key", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { onKeyup: handler },
  });

  // ACT
  await userEvent.tab();
  await userEvent.keyboard("{a>}");

  // ASSERT
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(KeyboardEvent));
  expect(emitted("keyup")).toBeDefined();
});

fact("does not emit a keyup event when the button is pending", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { isPending: true, onKeyup: handler },
  });

  // ACT
  await userEvent.tab();
  await userEvent.keyboard("{a>}");

  // ASSERT
  expect(handler).not.toHaveBeenCalled();
  expect(emitted("keyup")).toBeUndefined();
});

fact("emits a keypress event when pressing a key", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { onKeypress: handler },
  });

  // ACT
  await userEvent.tab();
  await userEvent.keyboard("{a>}");

  // ASSERT
  expect(handler).toHaveBeenCalledExactlyOnceWith(expect.any(KeyboardEvent));
  expect(emitted("keypress")).toBeDefined();
});

fact("does not emit a keypress event when button is pending", async () => {
  // ARRANGE
  const handler = vi.fn();
  const { emitted } = render(Button, {
    props: { isPending: true, onKeypress: handler },
  });

  // ACT
  await userEvent.tab();
  await userEvent.keyboard("{a>}");

  // ASSERT
  expect(handler).not.toHaveBeenCalled();
  expect(emitted("keypress")).toBeUndefined();
});

fact("adds a data-pressed attribute when the button is pressed", async () => {
  // ARRANGE
  render(Button, {
    props: { onPress: vi.fn() },
  });

  // ACT
  await userEvent.pointer({
    target: screen.getByRole("button"),
    keys: "[MouseLeft>]",
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveAttribute("data-pressed", "true");
});

fact("removes the data-pressed when the button is released", async () => {
  // ARRANGE
  render(Button);

  await userEvent.tab();
  await userEvent.pointer("[MouseLeft>]");

  // ACT
  await userEvent.pointer("[/MouseLeft]");

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveAttribute("data-pressed");
});

fact("adds a custom class when the button is pressed", async () => {
  // ARRANGE
  render(Button, {
    props: { className: ({ isPressed }) => (isPressed ? "custom-class" : "") },
  });

  // ACT
  await userEvent.pointer({
    target: screen.getByRole("button"),
    keys: "[MouseLeft>]",
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass(
    "custom-class vue-aria-Button"
  );
});

fact("removes the custom class when the button is released", async () => {
  // ARRANGE
  render(Button, {
    props: { className: ({ isPressed }) => (isPressed ? "custom-class" : "") },
  });

  await userEvent.tab();
  await userEvent.pointer("[MouseLeft>]");

  // ACT
  await userEvent.pointer("[/MouseLeft]");

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveClass("custom-class");
});

fact("adds custom content when button is pressed", async () => {
  // ARRANGE
  render(Button, {
    slots: {
      default: ({ isPressed }) => (isPressed ? "Pressed" : "Not pressed"),
    },
  });

  // ACT
  await userEvent.pointer({
    target: screen.getByRole("button"),
    keys: "[MouseLeft>]",
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveTextContent("Pressed");
});

fact("removes custom content when button is released", async () => {
  // ARRANGE
  render(Button, {
    slots: {
      default: ({ isPressed }) => (isPressed ? "Pressed" : "Not pressed"),
    },
  });

  await userEvent.tab();
  await userEvent.pointer("[MouseLeft>]");

  // ACT
  await userEvent.pointer("[/MouseLeft]");

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveTextContent("Pressed");
});

fact("adds custom content when the button is focused", async () => {
  // ARRANGE
  render(Button, {
    slots: {
      default: ({ isFocused }) => (isFocused ? "Focused" : "Not focused"),
    },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(screen.getByRole("button")).toHaveTextContent("Focused");
});

fact("removes custom content when the button is blurred", async () => {
  // ARRANGE
  render(Button, {
    slots: {
      default: ({ isFocused }) => (isFocused ? "Focused" : "Not focused"),
    },
  });

  await userEvent.click(screen.getByRole("button"));

  // ACT
  await userEvent.tab();

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveTextContent("Focused");
});

fact("adds a custom class when the button is focused", async () => {
  // ARRANGE
  render(Button, {
    props: { className: ({ isFocused }) => (isFocused ? "custom-class" : "") },
  });

  // ACT
  await userEvent.click(screen.getByRole("button"));

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass("custom-class");
});

fact("removes a custom class when the button is blurred", async () => {
  // ARRANGE
  render(Button, {
    props: { className: ({ isFocused }) => (isFocused ? "custom-class" : "") },
  });

  await userEvent.click(screen.getByRole("button"));

  // ACT
  await userEvent.tab();

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveClass("custom-class");
});

fact("adds a custom class when the button is pending", async () => {
  // ARRANGE
  render(Button, {
    props: {
      isPending: true,
      className: ({ isPending }) => (isPending ? "custom-class" : ""),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass(
    "custom-class vue-aria-Button"
  );
});

fact("removes a custom class when the button is not pending", async () => {
  // ARRANGE
  render(Button, {
    props: {
      className: ({ isPending }) => (isPending ? "custom-class" : ""),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).not.toHaveClass("custom-class");
});
