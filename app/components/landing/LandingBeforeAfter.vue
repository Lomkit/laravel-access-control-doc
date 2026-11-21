<script setup lang="ts">
import { afterCode, beforeCode, beforeDriftLine } from '~/data/landing/eyes'

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

      <div class="mt-8 grid gap-[18px] lg:grid-cols-2 lg:items-start">
        <div class="flex min-w-0 flex-col gap-[14px]">
          <p class="side side-before">
            <UIcon
              name="i-lucide-x"
              class="size-4"
            />
            Before
          </p>

          <LandingWindow
            title="PostPolicy.php + Post.php"
            note="two rules"
          >
            <LandingCodeLines
              class="py-3.5"
              :lines="beforeCode"
              :line-class="beforeClass"
            />
          </LandingWindow>

          <div class="rounded-[14px] border border-default bg-default p-5">
            <h3 class="text-lg font-bold text-highlighted">
              Sam may view his own posts only.
            </h3>
            <p class="mt-2 text-[14.5px] text-muted">
              His list never shows post 2. The policy still opens it by its URL, because it belongs to his company. No test fails.
            </p>
          </div>
        </div>

        <div class="flex min-w-0 flex-col gap-[14px]">
          <p class="side side-after">
            <UIcon
              name="i-lucide-check"
              class="size-4"
            />
            After
          </p>

          <LandingWindow
            title="PostControl.php"
            note="one rule"
          >
            <LandingCodeLines
              class="py-3.5"
              :lines="afterCode"
            />
          </LandingWindow>

          <div class="rounded-[14px] border border-default bg-default p-5">
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
              <code class="min-w-0 overflow-x-auto whitespace-nowrap text-[12.5px] text-highlighted">$this->assertControlAgrees(PostControl::class, $sam, Post::uncontrolled()->get());</code>
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.side {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.side-before {
  color: var(--lac-no);
}

.side-after {
  color: var(--lac-ok);
}

:deep(.lcl-line.is-drift) {
  background: color-mix(in oklab, var(--lac-no) 12%, transparent);
  box-shadow: inset 3px 0 0 var(--lac-no);
}
</style>
