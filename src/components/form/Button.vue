<template>
  <button
    @mouseover="
      (event) => {
        $emit('hoverStart');
        $emit('hoverChange', true, event);
      }
    "
    @mouseleave="
      (event) => {
        $emit('hoverChange', false, event);
        $emit('hoverEnd');
      }
    "
    :class="props.class ?? 'vue-aria-Button'"
  ></button>
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>();

defineEmits<{
  hoverStart: [];
  hoverEnd: [];
  hoverChange: [boolean, MouseEvent];
}>();
</script>
