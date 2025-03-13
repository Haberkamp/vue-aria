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
    :class="props.class ?? 'vue-aria-Button'"
    :data-hovered="isHovering ? 'true' : undefined"
  ></button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  class?: string;
}>();

defineEmits<{
  hoverStart: [MouseEvent];
  hoverEnd: [MouseEvent];
  hoverChange: [boolean, MouseEvent];
}>();

const isHovering = ref(false);
</script>
