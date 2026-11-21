<script setup lang="ts">
import { landing } from '~/data/landing/eyes'
import type { LandingReader } from '~/data/landing/eyes'

const props = defineProps<{
  reader: LandingReader
  active: boolean
}>()

const emit = defineEmits<{
  flip: []
}>()

const button = useTemplateRef<{ focus: () => void }>('button')

const signedOut = computed(() => props.reader.levels.view === null && props.reader.levels.update === null)

function levelAt(index: number) {
  return landing.levels.find(level => index >= level.from && index <= level.to)
}

function lineClass(index: number): Record<string, boolean> {
  const level = levelAt(index)

  return {
    'is-see': !!level && props.reader.levels.view === level.name,
    'is-edit': !!level && props.reader.levels.update === level.name
  }
}

/** Tags on the first line of a level: whether the reader sees, edits through it. */
function tags(index: number): { kind: 'see' | 'edit', text: string }[] {
  const level = landing.levels.find(item => item.from === index)

  if (!level) {
    return []
  }

  return [
    ...(props.reader.levels.view === level.name ? [{ kind: 'see' as const, text: `${props.reader.name} sees` }] : []),
    ...(props.reader.levels.update === level.name ? [{ kind: 'edit' as const, text: `${props.reader.name} edits` }] : [])
  ]
}

defineExpose({ focus: () => button.value?.focus() })
</script>

<template>
  <LandingWindow>
    <template #title>
      <span class="flex min-w-0 items-center gap-1.5 truncate text-xs font-semibold text-highlighted">
        <UIcon
          name="i-lucide-server-cog"
          class="size-3.5 shrink-0 text-(--lac-primary-text)"
        />
        <span class="truncate">Behind the scenes</span>
      </span>
    </template>
    <template #actions>
      <LandingBarButton
        ref="button"
        :active="active"
        @click="emit('flip')"
      >
        <UIcon
          name="i-lucide-undo-2"
          class="size-3.5"
        />
        Back to the app
      </LandingBarButton>
    </template>

    <div class="flex border-b border-default bg-muted/60 px-2">
      <span class="tab">
        <UIcon
          name="i-lucide-file-code"
          class="size-3.5 shrink-0 text-(--lac-primary-text)"
        />
        <span class="truncate">app/Access/Controls/PostControl.php</span>
      </span>
    </div>

    <p
      v-if="signedOut"
      class="note"
    >
      <UIcon
        name="i-lucide-lock"
        class="size-3.5 shrink-0"
      />
      Not signed in: no rule applies, nothing is shown.
    </p>

    <LandingCodeLines
      class="py-2.5"
      :lines="landing.control"
      :line-class="lineClass"
      scroll-on-phone
    >
      <template #after="{ index }">
        <span
          v-for="tag in tags(index)"
          :key="tag.kind"
          class="tag"
          :class="`tag-${tag.kind}`"
        >{{ tag.text }}</span>
      </template>
    </LandingCodeLines>

    <p class="feeds">
      <span>Read by</span>
      <span
        v-for="feed in ['your lists', 'Edit buttons', 'search']"
        :key="feed"
        class="feed"
      >
        <UIcon
          name="i-lucide-arrow-down"
          class="size-3 text-(--lac-primary-text)"
        />{{ feed }}
      </span>
    </p>
  </LandingWindow>
</template>

<style scoped src="./landing-rule-view.css"></style>
