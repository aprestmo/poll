<template>
  <button @click="$emit('click', $event)">Logg inn for å stemme</button>
</template>

<script setup lang="ts">
defineEmits<{
  click: [event: Event]
}>()
</script>

<style scoped>
button {
  background-color: var(--color-button-primary-default-bg);
  border: 0;
  border-radius: var(--border-radius-button);
  color: var(--color-button-primary-default-fg);
  cursor: pointer;
  display: block;
  font-family: 'Sharp Grotesk Book 20';
  inline-size: 100%;
  letter-spacing: var(--typography-utility-button-l-letter-spacing);
  line-height: var(--typography-utility-button-l-line-height);
  padding-block: 1.25rem;
  padding-inline: 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: var(--typography-utility-button-l-text-case);
  text-trim: trim-both cap alphabetic;
}
</style>
