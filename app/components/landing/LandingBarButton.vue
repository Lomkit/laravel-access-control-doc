<script setup lang="ts">
defineProps<{
  /** Whether its side of the card is in view: the hidden side keeps it out of the tab order. */
  active: boolean
}>()

const button = useTemplateRef<HTMLButtonElement>('button')

defineExpose({ focus: () => button.value?.focus({ preventScroll: true }) })
</script>

<template>
  <button
    ref="button"
    type="button"
    class="bar-btn"
    :tabindex="active ? 0 : -1"
  >
    <slot />
  </button>
</template>

<style scoped>
.bar-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid color-mix(in oklab, var(--ui-primary) 50%, var(--ui-border));
  border-radius: 8px;
  background: color-mix(in oklab, var(--ui-primary) 8%, var(--ui-bg));
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  color: var(--lac-primary-text);
  cursor: pointer;
}

.bar-btn:hover {
  background: color-mix(in oklab, var(--ui-primary) 14%, var(--ui-bg));
}

.bar-btn:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}
</style>
