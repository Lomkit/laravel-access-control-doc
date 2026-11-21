<script setup lang="ts">
import { landing } from '~/data/landing/eyes'
import type { LandingReader } from '~/data/landing/eyes'

const props = defineProps<{
  reader: LandingReader
}>()

const hits = computed(() => landing.searchUncontrolled.map(id => ({
  id,
  title: landing.posts.find(post => post.id === id)?.title ?? '',
  found: props.reader.search.includes(id)
})))
</script>

<template>
  <div class="px-2.5 pt-2 sm:px-3.5 sm:pt-3">
    <div
      class="flex h-[34px] items-center gap-2 rounded-[10px] border border-accented bg-muted px-3 text-[13.5px] text-highlighted sm:h-[38px] sm:text-sm"
    >
      <UIcon
        name="i-lucide-search"
        class="size-4 shrink-0 text-muted"
      />
      <span><span class="sr-only">Search: </span>{{ landing.query }}</span>
      <span
        class="ml-auto text-[12.5px] font-semibold whitespace-nowrap text-muted"
      ><b class="text-(--lac-primary-text)">{{ reader.searchTotal }}</b> {{ reader.searchTotal === 1 ? 'result' : 'results' }}</span>
    </div>
    <ul
      class="mt-1.5 flex flex-wrap gap-1 sm:mt-2 sm:gap-1.5"
      aria-label="Results"
    >
      <li
        v-for="hit in hits"
        :key="hit.id"
        class="hit"
        :class="{ 'is-off': !hit.found }"
      >
        {{ hit.title }}<span class="sr-only">{{ hit.found ? ': found' : ': not found' }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hit {
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border: 1px solid color-mix(in oklab, var(--ui-primary) 40%, var(--ui-border));
  border-radius: 9999px;
  background: color-mix(in oklab, var(--ui-primary) 7%, transparent);
  font-size: 12px;
  font-weight: 600;
  color: var(--ui-text-highlighted);
  transition: opacity 0.35s ease, filter 0.35s ease;
}

.hit.is-off {
  border-style: dashed;
  opacity: 0.35;
  filter: grayscale(1);
  text-decoration: line-through;
}

@media (max-width: 640px) {
  .hit { padding: 1px 7px; font-size: 11px; }
}

@media (prefers-reduced-motion: reduce) {
  .hit { transition: none; }
}
</style>
