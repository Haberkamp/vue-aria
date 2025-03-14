<template>
  <component
    :is="is"
    @mouseover="
      (event: MouseEvent) => {
        isHovering = true;
        $emit('hoverStart', event);
        $emit('hoverChange', true, event);
      }
    "
    @mouseleave="
      (event: MouseEvent) => {
        isHovering = false;
        $emit('hoverChange', false, event);
        $emit('hoverEnd', event);
      }
    "
    @focus="
      (event: FocusEvent) => {
        isFocused = true;
        $emit('focus', event);
      }
    "
    @blur="
      (event: FocusEvent) => {
        isFocused = false;
        $emit('blur', event);
      }
    "
    @click="
      (event: MouseEvent) => {
        if (isPending) return;

        $emit('press', event);
        $emit('click', event);
      }
    "
    @keydown="
      (event: KeyboardEvent) => {
        if (isPending) return;

        $emit('keydown', event);
      }
    "
    @keyup="
      (event: KeyboardEvent) => {
        if (isPending) return;

        $emit('keyup', event);
      }
    "
    @keypress="
      (event: KeyboardEvent) => {
        if (isPending) return;

        $emit('keypress', event);
      }
    "
    @mousedown="
      () => {
        isPressed = true;
      }
    "
    @mouseup="
      () => {
        console.log('mouseup');
        isPressed = false;
      }
    "
    :class="customClass"
    :data-hovered="isHovering ? 'true' : undefined"
    :data-focus-visible="isFocused ? 'true' : undefined"
    :data-focused="isFocused ? 'true' : undefined"
    :data-disabled="disabled ? 'true' : undefined"
    :data-pending="isPending ? 'true' : undefined"
    :data-pressed="isPressed ? 'true' : undefined"
    :disabled="disabled"
    :href="isPending ? undefined : href"
    :aria-disabled="isPending ? 'true' : undefined"
  >
    <slot
      name="default"
      :is-disabled="disabled"
      :is-focus-visible="isFocused"
      :is-hovered="isHovering"
      :is-pending="isPending"
      :is-pressed="isPressed"
      :is-focused="isFocused"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    class?: string;
    className?:
      | string
      | ((props: {
          isHovered: boolean;
          isFocusVisible: boolean;
          isDisabled: boolean;
          isPressed: boolean;
          isFocused: boolean;
        }) => string);
    disabled?: boolean;
    is?: string;
    isPending?: boolean;
    href?: string;
  }>(),
  {
    disabled: false,
    is: "button",
    isPending: false,
  }
);

defineEmits<{
  hoverStart: [MouseEvent];
  hoverEnd: [MouseEvent];
  hoverChange: [boolean, MouseEvent];
  press: [MouseEvent];
  blur: [FocusEvent];
  focus: [FocusEvent];
  click: [MouseEvent];
  keydown: [KeyboardEvent];
  keyup: [KeyboardEvent];
  keypress: [KeyboardEvent];
}>();

defineSlots<{
  default(props: {
    isDisabled: boolean;
    isFocusVisible: boolean;
    isHovered: boolean;
    isPending: boolean;
    isPressed: boolean;
    isFocused: boolean;
  }): any;
}>();

const DEFAULT_CLASS = "vue-aria-Button";

const customClass = computed(() => {
  const baseClass = props.class ?? DEFAULT_CLASS;

  const usingRenderProp = typeof props.className === "function";
  if (usingRenderProp) {
    const dynamicClasses = props.className({
      isHovered: isHovering.value,
      isFocusVisible: isFocused.value,
      isDisabled: props.disabled,
      isPressed: isPressed.value,
      isFocused: isFocused.value,
    });

    return `${dynamicClasses} ${baseClass}`;
  }

  return baseClass;
});

const isHovering = ref(false);

const isFocused = ref(false);

const isPressed = ref(false);
</script>
