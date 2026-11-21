<script setup lang="ts">
withDefaults(defineProps<{
  center?: boolean
  meta?: boolean
}>(), {
  center: false,
  meta: true
})

const requirements = `PHP ${packageInfo.php}+ · Laravel ${packageInfo.laravel} · MIT`
</script>

<template>
  <div
    class="flex max-w-full flex-col gap-3"
    :class="center ? 'items-center' : 'items-start'"
  >
    <LandingInstall />
    <div class="flex flex-wrap gap-2.5">
      <UButton
        to="/getting-started/introduction"
        size="lg"
        trailing-icon="i-lucide-arrow-right"
      >
        Get started
      </UButton>
      <UButton
        to="https://github.com/Lomkit/laravel-access-control"
        target="_blank"
        size="lg"
        color="neutral"
        variant="subtle"
        icon="i-simple-icons-github"
      >
        GitHub
      </UButton>
    </div>
    <p
      v-if="meta"
      class="text-xs text-muted"
    >
      {{ requirements }}
    </p>
  </div>
</template>
