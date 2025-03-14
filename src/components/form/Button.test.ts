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
  render(Button);

  // ACT
  await userEvent.click(screen.getByRole("button"));
});

fact("emits a blur event when the button is blurred", async () => {
  // ARRANGE
  render(Button);

  // ACT
  await userEvent.tab();
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
      className: ({ disabled }) => (disabled ? "custom-class" : ""),
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
      className: ({ disabled }) => (disabled ? "custom-class" : ""),
    },
  });

  // ASSERT
  expect(screen.getByRole("button")).toHaveClass("custom-class");
});

fact("supports scoped slots", () => {
  // ARRANGE
  render(Button, {
    slots: {
      default: ({ disabled }) => (disabled ? "Disabled" : "Enabled"),
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
