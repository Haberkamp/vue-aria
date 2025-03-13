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
    :class="customClass"
    :data-hovered="isHovering ? 'true' : undefined"
  ></button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  class?: string | ((props: { isHovered: boolean }) => string);
  className?: string | ((props: { isHovered: boolean }) => string);
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
    });

    return `${dynamicClasses} ${baseClass}`;
  }

  return baseClass;
});

const isHovering = ref(false);
</script>
