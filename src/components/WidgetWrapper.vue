<template>
  <component :is="tag" data-widget-wrapper>
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
  }>(),
  { tag: 'div' },
)
</script>

<style>
[data-widget-wrapper] {
  inline-size: min(100% - 3rem, 680px);
  margin-inline: auto;
}
</style>
