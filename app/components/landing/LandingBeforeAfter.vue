<script setup lang="ts">
import { afterCode, beforeCode, beforeDriftLine } from '~/data/landing/eyes'

const mode = ref<'before' | 'after'>('before')

function beforeClass(index: number): Record<string, boolean> {
  return { 'is-drift': index === beforeDriftLine }
}
</script>

<template>
  <section
    id="drift"
    class="scroll-mt-16 bg-muted py-16 sm:py-24"
  >
    <UContainer>
      <LandingHeading
        eyebrow="Why one file"
        icon="i-lucide-split"
        title="Two rules drift. One control cannot."
        text="Without it, a policy answers “may Sam open this post?” and a scope answers “which posts does Sam list?”. Written twice, they disagree."
      />

      <div
        class="toggle"
        role="group"
        aria-label="Show the code before or after"
      >
        <button
          type="button"
          :aria-pressed="mode === 'before' ? 'true' : 'false'"
          @click="mode = 'before'"
        >
          Before
        </button>
        <button
          type="button"
          :aria-pressed="mode === 'after' ? 'true' : 'false'"
          @click="mode = 'after'"
        >
          After
        </button>
      </div>

      <div class="mt-[18px] grid gap-[18px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
        <LandingWindow
          :title="mode === 'before' ? 'PostPolicy.php + Post.php' : 'PostControl.php'"
          :note="mode === 'before' ? 'two rules' : 'one rule'"
        >
          <LandingCodeLines
            v-if="mode === 'before'"
            class="py-3.5"
            :lines="beforeCode"
            :line-class="beforeClass"
          />
          <LandingCodeLines
            v-else
            class="py-3.5"
            :lines="afterCode"
          />
        </LandingWindow>

        <div
          class="rounded-[14px] border border-default bg-default p-5"
          aria-live="polite"
        >
          <template v-if="mode === 'before'">
            <h3 class="text-lg font-bold text-highlighted">
              Sam may view his own posts only.
            </h3>
            <p class="mt-2 text-[14.5px] text-muted">
              His list never shows post 2. The policy still opens it by its URL, because it belongs to his company. No test fails.
            </p>
          </template>
          <template v-else>
            <h3 class="text-lg font-bold text-highlighted">
              The policy, the lists and the search read the same file.
            </h3>
            <p class="mt-2 text-[14.5px] text-muted">
              Behind <code class="text-highlighted">$user->can()</code>, the <code class="text-highlighted">controlled()</code> scope and controlled searches. And a test proves they agree:
            </p>
            <p class="mt-3.5 flex gap-2.5 text-sm">
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-(--lac-ok)"
              />
              <code class="text-[12.5px] break-words text-highlighted">$this->assertControlAgrees(PostControl::class, $sam, Post::uncontrolled()->get());</code>
            </p>
          </template>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  margin-top: 24px;
  padding: 4px;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  background: var(--ui-bg);
}

.toggle button {
  min-height: 36px;
  padding: 0 16px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text-muted);
  cursor: pointer;
}

.toggle button[aria-pressed="true"] {
  background: var(--ui-bg-elevated);
  color: var(--ui-text-highlighted);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
}

.toggle button:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}

:deep(.lcl-line.is-drift) {
  background: color-mix(in oklab, var(--lac-no) 12%, transparent);
  box-shadow: inset 3px 0 0 var(--lac-no);
}
</style>
