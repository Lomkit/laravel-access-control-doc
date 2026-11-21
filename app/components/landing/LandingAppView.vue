<script setup lang="ts">
import { landing } from '~/data/landing/eyes'
import type { LandingPost, LandingReader } from '~/data/landing/eyes'

const props = defineProps<{
  reader: LandingReader
  active: boolean
}>()

const emit = defineEmits<{
  flip: []
}>()

const button = useTemplateRef<HTMLButtonElement>('button')

function state(post: LandingPost): 'edit' | 'read' | 'hidden' {
  if (!props.reader.listed.includes(post.id)) {
    return 'hidden'
  }

  return props.reader.editable.includes(post.id) ? 'edit' : 'read'
}

defineExpose({ focus: () => button.value?.focus({ preventScroll: true }) })
</script>

<template>
  <LandingWindow>
    <template #title>
      <span class="min-w-0 truncate font-mono text-xs text-muted">acme.test<b class="font-medium text-highlighted">/posts</b></span>
    </template>
    <template #actions>
      <button
        ref="button"
        type="button"
        class="lac-bar-btn"
        :tabindex="active ? 0 : -1"
        @click="emit('flip')"
      >
        Where is the rule?
        <UIcon
          name="i-lucide-arrow-right"
          class="size-3.5"
        />
      </button>
    </template>

    <LandingSearch :reader="reader" />

    <div class="flex items-baseline justify-between gap-2.5 px-3 pt-2 pb-1 sm:px-4 sm:pt-2.5 sm:pb-1.5">
      <span class="text-sm font-bold text-highlighted sm:text-[15px]">Posts</span>
      <span class="text-[12.5px] whitespace-nowrap text-muted"><b class="text-highlighted">{{ reader.listed.length }}</b> of {{ landing.posts.length }} · <b class="text-highlighted">{{ reader.editable.length }}</b> editable</span>
    </div>
    <ul
      class="grid gap-1 px-2 pb-2 sm:gap-[5px] sm:px-2.5 sm:pb-3"
      aria-label="Posts"
    >
      <LandingPostRow
        v-for="(post, index) in landing.posts"
        :key="post.id"
        :post="post"
        :state="state(post)"
        :index="index"
        :version="reader.key"
      />
    </ul>
  </LandingWindow>
</template>
