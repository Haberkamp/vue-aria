<template>
  <button
    @mouseover="
      (event) => {
        event.preventDefault();
        $emit('hoverStart');
      }
    "
    @mouseleave="$emit('hoverEnd')"
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
}>();
</script>
