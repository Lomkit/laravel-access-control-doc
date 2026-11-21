<script setup lang="ts">
defineProps<{
  text: string
  /** Horizontal position of the tip, under the face that speaks. */
  tip: string
}>()
</script>

<template>
  <p
    class="bubble"
    :style="{ '--tip': tip }"
    aria-live="polite"
  >
    <span
      :key="text"
      class="bubble-text"
    >{{ text }}</span>
  </p>
</template>

<style scoped>
.bubble {
  position: relative;
  margin: 10px 0 12px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--ui-text-highlighted);
  color: var(--ui-bg);
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  text-wrap: balance;
}

.bubble::before {
  content: '';
  position: absolute;
  top: -7px;
  left: var(--tip, 50%);
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: inherit;
  transform: translateX(-50%) rotate(45deg);
  transition: left 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
}

@media (prefers-reduced-motion: no-preference) {
  .bubble-text {
    display: inline-block;
    animation: say 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble::before { transition: none; }
}

@keyframes say {
  from { opacity: 0; transform: translateY(4px) scale(0.97); }
}

@media (max-width: 640px) {
  .bubble { margin: 6px 0 8px; padding: 8px 12px; font-size: 14px; }
}
</style>
