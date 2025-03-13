<template>
  <button
    @mouseover="
      (event) => {
        event.preventDefault();
        $emit('hoverStart');
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
}>();
</script>
