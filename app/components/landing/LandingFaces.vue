<script setup lang="ts">
import type { LandingReader } from '~/data/landing/eyes'

defineProps<{
  readers: LandingReader[]
  current: string
  invite: string | null
}>()

const emit = defineEmits<{
  pick: [key: string]
}>()
</script>

<template>
  <div
    class="grid grid-cols-4 gap-1.5 sm:gap-3"
    role="group"
    aria-label="Look at the posts as"
  >
    <button
      v-for="reader in readers"
      :key="reader.key"
      type="button"
      class="face"
      :class="[`tone-${reader.tone}`, { 'is-on': reader.key === current, 'is-invite': reader.key === invite }]"
      :aria-pressed="reader.key === current ? 'true' : 'false'"
      @click="emit('pick', reader.key)"
    >
      <span
        class="face-photo"
        aria-hidden="true"
      >
        <template v-if="reader.initials">{{ reader.initials }}</template>
        <UIcon
          v-else
          name="i-lucide-user"
          class="size-6"
        />
      </span>
      <span class="face-name">{{ reader.name }}</span>
      <span class="face-label">{{ reader.label }}</span>
      <span
        v-if="reader.key === invite"
        class="face-hint"
        aria-hidden="true"
      >try me</span>
    </button>
  </div>
</template>

<style scoped>
.tone-violet { --tone: #7c3aed; }
.tone-sky { --tone: #0284c7; }
.tone-emerald { --tone: #059669; }
.tone-slate { --tone: #64748b; }
.dark .tone-violet { --tone: #a78bfa; }
.dark .tone-sky { --tone: #38bdf8; }
.dark .tone-emerald { --tone: #34d399; }
.dark .tone-slate { --tone: #94a3b8; }

.face {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 6px 2px 8px;
  border-radius: 14px;
  text-align: center;
  cursor: pointer;
}

.face:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}

.face-photo {
  position: relative;
  display: inline-flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--tone);
  color: #fff;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 3px var(--ui-bg), 0 0 0 4px var(--ui-border);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
}

.face:hover .face-photo {
  transform: translateY(-2px);
}

.face.is-on .face-photo {
  transform: scale(1.06);
  box-shadow: 0 0 0 3px var(--ui-bg), 0 0 0 6px var(--ui-primary), 0 10px 24px -10px var(--ui-primary);
}

.face-name {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--ui-text-highlighted);
}

.face-label {
  font-size: 12.5px;
  line-height: 1.2;
  color: var(--ui-text-muted);
}

.face.is-invite .face-photo::after {
  content: '';
  position: absolute;
  inset: -6px;
  border: 2px solid var(--ui-primary);
  border-radius: 9999px;
  opacity: 0.7;
}

.face-hint {
  position: absolute;
  top: -4px;
  right: 4px;
  padding: 1px 7px;
  border-radius: 9999px;
  background: var(--ui-primary);
  color: #1a0a02;
  font-size: 10.5px;
  font-weight: 700;
}

@media (prefers-reduced-motion: no-preference) {
  .face.is-invite .face-photo::after {
    animation: invite 1.6s ease-out infinite;
  }
}

@keyframes invite {
  from { opacity: 0.8; transform: scale(0.92); }
  to { opacity: 0; transform: scale(1.25); }
}

@media (max-width: 640px) {
  .face { gap: 3px; padding: 4px 0; }
  .face-photo { width: 44px; height: 44px; font-size: 13px; }
  .face-name { font-size: 13px; }
  .face-label { font-size: 11px; }
}
</style>
