<script setup lang="ts">
import { apiRoute, landing } from '~/data/landing/eyes'

const routeLine = [apiRoute]
</script>

<template>
  <section
    id="rest-api"
    class="scroll-mt-16 py-16 sm:py-24"
  >
    <UContainer>
      <LandingHeading
        eyebrow="laravel-rest-api"
        icon="i-lucide-plug"
        title="Your API follows too."
        text="With laravel-rest-api 3.6 or later, there is nothing to wire: one route line, and each user gets their own rows."
      />

      <div class="mt-7 flex flex-wrap items-center gap-3 rounded-[14px] border border-default bg-default px-4 py-3 shadow-xl shadow-black/5 dark:bg-neutral-950/80 dark:shadow-black/40">
        <span class="font-mono text-xs text-muted">routes/api.php</span>
        <LandingCodeLines
          class="route min-w-0"
          :lines="routeLine"
        />
      </div>

      <ul class="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <li
          v-for="reader in landing.readers"
          :key="reader.key"
          class="rounded-xl border border-default bg-muted p-3.5"
        >
          <span class="flex items-center gap-2 text-[13.5px] font-semibold text-highlighted">
            <span
              class="avatar"
              :style="{ '--tone': `var(--lac-tone-${reader.tone})` }"
              aria-hidden="true"
            >
              <template v-if="reader.initials">{{ reader.initials }}</template>
              <UIcon
                v-else
                name="i-lucide-user"
                class="size-3.5"
              />
            </span>
            {{ reader.name }}
          </span>
          <p class="mt-2 font-mono text-xs text-muted">
            POST /api/posts/search<br>→ <b class="font-semibold text-highlighted">{{ reader.listed.length ? `posts ${reader.listed.join(', ')}` : 'no row' }}</b>
          </p>
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<style scoped>
.route :deep(.lcl-line) {
  padding: 0;
  text-indent: 0;
  font-size: clamp(13px, 1.8vw, 16px);
}

.avatar {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--tone);
  color: #fff;
  font-size: 9.5px;
  font-weight: 700;
}
</style>
