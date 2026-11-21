<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  icon: string
  title: string
  text?: string
}>(), {
  text: undefined
})
</script>

<template>
  <div class="max-w-3xl">
    <p class="flex items-center gap-2 text-sm font-semibold text-(--lac-primary-text)">
      <span class="flex size-7 items-center justify-center rounded-lg bg-primary/10 ring ring-primary/20">
        <UIcon
          :name="icon"
          class="size-4"
        />
      </span>
      {{ eyebrow }}
    </p>
    <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-balance text-highlighted sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
      {{ title }}
    </h2>
    <p
      v-if="text"
      class="mt-4 text-base text-pretty text-muted sm:text-[17px]"
    >
      <slot name="text">
        {{ text }}
      </slot>
    </p>
  </div>
</template>
