<template>
  <section class="relative isolate overflow-hidden">
    <div
      class="lac-hero-bg pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    />

    <UContainer class="pt-3.5 pb-12 sm:pt-7 sm:pb-14 lg:pt-14 lg:pb-20">
      <div class="grid grid-cols-1 gap-3 sm:gap-[18px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
        <div class="min-w-0">
          <h1 class="lac-title text-highlighted">
            Same posts, <span class="lac-gradient-text">different eyes.</span>
          </h1>
          <p class="lac-lead text-muted">
            Write once who can see and edit which rows. Your lists, Edit buttons and search follow.
          </p>
          <div class="mt-6 hidden lg:block">
            <LandingStart />
          </div>
        </div>

        <LandingEyesDemo />

        <div class="mt-2 lg:hidden">
          <LandingStart :meta="false" />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.lac-hero-bg {
  background:
    radial-gradient(50rem 30rem at 15% -10%, color-mix(in oklab, var(--ui-primary) 22%, transparent), transparent 70%),
    radial-gradient(40rem 30rem at 100% 30%, rgb(91 108 255 / 0.1), transparent 70%);
}

.lac-title {
  font-size: clamp(32px, 5.2vw, 62px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.lac-lead {
  max-width: 34rem;
  margin-top: 14px;
  font-size: clamp(16px, 1.7vw, 19px);
  text-wrap: pretty;
}

.lac-gradient-text {
  background: linear-gradient(100deg, var(--ui-primary) 10%, #f43f5e 55%, var(--ui-primary) 95%);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  .lac-gradient-text {
    animation: lac-shine 8s ease-in-out infinite alternate;
  }
}

@keyframes lac-shine {
  to { background-position: 100% 0; }
}

@media (max-width: 640px) {
  .lac-title { font-size: 30px; }
  .lac-lead { margin-top: 8px; font-size: 15px; }
}
</style>
