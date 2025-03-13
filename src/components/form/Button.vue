<template>
  <button
    @mouseover="
      (event) => {
        isHovering = true;
        $emit('hoverStart', event);
        $emit('hoverChange', true, event);
      }
    "
    @mouseleave="
      (event) => {
        isHovering = false;
        $emit('hoverChange', false, event);
        $emit('hoverEnd', event);
      }
    "
    @focus="isFocused = true"
    @blur="isFocused = false"
    :class="customClass"
    :data-hovered="isHovering ? 'true' : undefined"
    :data-focus-visible="isFocused ? 'true' : undefined"
    :disabled="disabled"
  ></button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  class?: string;
  className?:
    | string
    | ((props: { isHovered: boolean; isFocusVisible: boolean }) => string);
  disabled?: boolean;
}>();

defineEmits<{
  hoverStart: [MouseEvent];
  hoverEnd: [MouseEvent];
  hoverChange: [boolean, MouseEvent];
}>();

const DEFAULT_CLASS = "vue-aria-Button";

const customClass = computed(() => {
  const baseClass = props.class ?? DEFAULT_CLASS;

  const usingRenderProp = typeof props.className === "function";
  if (usingRenderProp) {
    const dynamicClasses = props.className({
      isHovered: isHovering.value,
      isFocusVisible: isFocused.value,
    });

    return `${dynamicClasses} ${baseClass}`;
  }

  return baseClass;
});

const isHovering = ref(false);

const isFocused = ref(false);
</script>
