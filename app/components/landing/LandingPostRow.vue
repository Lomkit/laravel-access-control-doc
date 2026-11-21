<script setup lang="ts">
import { landing } from '~/data/landing/eyes'
import type { LandingPost } from '~/data/landing/eyes'

const props = defineProps<{
  post: LandingPost
  state: 'edit' | 'read' | 'hidden'
  index: number
  /** Changes with the reader, so the action pops in again on each switch. */
  version: string
}>()

const client = computed(() => landing.clients[props.post.client] ?? '')
const parts = computed(() => queryParts(props.post.title, landing.query))
const label = { hidden: 'hidden', edit: 'can edit', read: 'read only' }
</script>

<template>
  <li
    class="row"
    :class="{ 'is-hidden': state === 'hidden' }"
    :style="{ '--i': index }"
  >
    <span class="flex min-w-0 flex-col gap-px">
      <span class="row-title"><template
        v-for="(part, position) in parts"
        :key="position"
      ><mark v-if="part.match">{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></span>
      <span class="row-meta">
        <span
          class="company"
          :class="`is-${client.toLowerCase()}`"
        >{{ client }}</span>by {{ landing.authors[post.author] }}
      </span>
    </span>
    <span class="flex justify-end">
      <span class="sr-only">{{ label[state] }}</span>
      <Transition
        name="pop"
        mode="out-in"
      >
        <span
          v-if="state === 'edit'"
          :key="`${version}e`"
          class="action edit"
          aria-hidden="true"
        ><UIcon
          name="i-lucide-pencil"
          class="size-3.5"
        />Edit</span>
        <span
          v-else-if="state === 'read'"
          :key="`${version}r`"
          class="action ro"
          aria-hidden="true"
        ><UIcon
          name="i-lucide-lock"
          class="size-3.5"
        /><span class="ro-text">Read only</span></span>
        <span
          v-else
          :key="`${version}h`"
          class="action stamp"
          aria-hidden="true"
        >hidden</span>
      </Transition>
    </span>
  </li>
</template>

<style scoped>
.row {
  --delay: calc(var(--i) * 45ms);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 6px 8px 6px 12px;
  border: 1px solid var(--ui-border);
  border-radius: 10px;
  background: var(--ui-bg);
  transition: opacity 0.35s ease var(--delay), filter 0.35s ease var(--delay), transform 0.35s ease var(--delay);
}

.row.is-hidden {
  opacity: 0.32;
  filter: grayscale(1);
  transform: scale(0.985);
}

.row-title {
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--ui-text-highlighted);
}

.row-title mark {
  padding: 0 1px;
  border-radius: 3px;
  background: color-mix(in oklab, var(--ui-primary) 22%, transparent);
  color: inherit;
}

.row-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  color: var(--ui-text-muted);
}

.company {
  padding: 0 7px;
  border: 1px solid var(--ui-border);
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
}

.company.is-acme {
  border-color: color-mix(in oklab, var(--lac-acme) 35%, transparent);
  color: var(--lac-acme);
}

.company.is-globex {
  border-color: color-mix(in oklab, var(--lac-globex) 40%, transparent);
  color: var(--lac-globex);
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 11px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
}

.edit {
  background: var(--lac-update);
  color: var(--lac-on-update);
}

.ro {
  border: 1px dashed var(--ui-border-accented);
  font-weight: 500;
  color: var(--ui-text-muted);
}

.stamp {
  height: 24px;
  padding: 0 8px;
  border: 1.5px solid currentColor;
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lac-no);
  transform: rotate(-4deg);
}

@media (prefers-reduced-motion: no-preference) {
  .pop-enter-active {
    animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0ms) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  .row { transition: none; }
}

@keyframes pop {
  from { opacity: 0; transform: scale(0.6); }
}

@media (max-width: 640px) {
  .row { min-height: 0; padding: 4px 6px 4px 10px; gap: 8px; }
  .row-title { font-size: 13.5px; }
  .row-meta { font-size: 11px; }
  .company { font-size: 10px; }
  .action { height: 26px; padding: 0 9px; font-size: 12px; }
  .stamp { height: 20px; font-size: 9.5px; }
}

@media (max-width: 420px) {
  .ro { padding: 0 9px; }
  .ro-text { display: none; }
}
</style>
