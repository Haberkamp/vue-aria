<template>
  <button
    @mouseover="
      (event) => {
        isHovering = true;
        $emit('hoverStart');
        $emit('hoverChange', true, event);
      }
    "
    @mouseleave="
      (event) => {
        isHovering = false;
        $emit('hoverChange', false, event);
        $emit('hoverEnd');
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
  hoverStart: [];
  hoverEnd: [];
  hoverChange: [boolean, MouseEvent];
}>();

const isHovering = ref(false);
</script>
