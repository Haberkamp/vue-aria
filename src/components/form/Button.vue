<template>
  <button :class="props.class ?? 'vue-aria-Button'"></button>
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>();
</script>
