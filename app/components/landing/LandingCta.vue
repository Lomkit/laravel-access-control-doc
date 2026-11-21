<script setup lang="ts">
const guides = [
  { label: 'Quick start', to: '/getting-started/quick-start' },
  { label: 'Controls', to: '/essentials/controls' },
  { label: 'Perimeters', to: '/essentials/perimeters' },
  { label: 'Levels', to: '/essentials/levels' },
  { label: 'Boundaries', to: '/essentials/boundaries' },
  { label: 'Policies', to: '/essentials/policies' },
  { label: 'Queries', to: '/essentials/queries' },
  { label: 'Search', to: '/search/overview' },
  { label: 'Testing', to: '/testing-and-tooling/testing' },
  { label: 'Upgrade from 0.x', to: '/getting-started/upgrade-guide' },
  { label: 'Use with AI', to: '/digging-deeper/use-with-ai' }
]
</script>

<template>
  <section class="pt-6 pb-16 sm:pb-24">
    <UContainer class="flex flex-col items-center text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-balance text-highlighted sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        One class per model. Every read agrees.
      </h2>
      <LandingStart
        class="mt-6"
        center
      />
      <nav
        aria-label="Documentation guides"
        class="mt-8 max-w-2xl"
      >
        <ul class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <li
            v-for="guide in guides"
            :key="guide.to"
          >
            <ULink
              :to="guide.to"
              class="text-muted hover:text-highlighted"
            >
              {{ guide.label }}
            </ULink>
          </li>
        </ul>
      </nav>
    </UContainer>
  </section>
</template>
