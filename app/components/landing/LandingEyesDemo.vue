<script setup lang="ts">
import { landing } from '~/data/landing/eyes'

const current = ref('admin')
const touched = ref(false)
const flipped = ref(false)
const announcement = ref('')

const card = useTemplateRef<HTMLElement>('card')
const front = useTemplateRef<{ focus: () => void }>('front')
const back = useTemplateRef<{ focus: () => void }>('back')

const index = computed(() => Math.max(0, landing.readers.findIndex(reader => reader.key === current.value)))
const reader = computed(() => landing.readers[index.value]!)
const tip = computed(() => `${(index.value + 0.5) * (100 / landing.readers.length)}%`)

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** After a click, bring the card into view when it is not (phones); never scroll otherwise. */
function reveal() {
  nextTick(() => {
    const box = card.value?.getBoundingClientRect()

    if (box && (box.top < 0 || box.top > window.innerHeight * 0.55)) {
      card.value?.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' })
    }
  })
}

function pick(key: string) {
  current.value = key
  touched.value = true
  reveal()
}

function flip(value: boolean) {
  flipped.value = value
  announcement.value = value ? 'Showing PostControl.php, the code behind the app' : 'Showing the app'
  nextTick(() => (value ? back.value : front.value)?.focus())
}
</script>

<template>
  <div class="min-w-0">
    <LandingFaces
      :readers="landing.readers"
      :current="current"
      :invite="touched ? null : 'author'"
      @pick="pick"
    />

    <LandingBubble
      :text="reader.say"
      :tip="tip"
    />

    <p
      class="sr-only"
      aria-live="polite"
    >
      {{ announcement }}
    </p>

    <div
      ref="card"
      class="card scroll-mt-20"
      :class="{ 'is-flipped': flipped }"
    >
      <div
        class="card-face card-front"
        :aria-hidden="flipped ? 'true' : undefined"
        :inert="flipped || undefined"
      >
        <LandingAppView
          ref="front"
          :reader="reader"
          :active="!flipped"
          @flip="flip(true)"
        />
      </div>
      <div
        class="card-face card-back"
        :aria-hidden="flipped ? undefined : 'true'"
        :inert="!flipped || undefined"
      >
        <LandingRuleView
          ref="back"
          :reader="reader"
          :active="flipped"
          @flip="flip(false)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  perspective: 1800px;
}

/* The face in view sets the height of the card; the other one lies on top of it, out of the flow. */
.card-face {
  min-width: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: transform 0.7s cubic-bezier(0.4, 0.1, 0.2, 1), visibility 0s linear 0.35s;
}

.card-back,
.card.is-flipped .card-front {
  position: absolute;
  inset: 0 0 auto;
}

.card-back {
  transform: rotateY(180deg);
  visibility: hidden;
}

.card.is-flipped .card-front {
  transform: rotateY(-180deg);
  visibility: hidden;
}

.card.is-flipped .card-back {
  position: relative;
  transform: rotateY(0);
  visibility: visible;
}

/* The face that comes in is visible at once, so it can take the focus; the other one hides mid-turn. */
.card:not(.is-flipped) .card-front,
.card.is-flipped .card-back {
  transition: transform 0.7s cubic-bezier(0.4, 0.1, 0.2, 1), visibility 0s;
}

@media (prefers-reduced-motion: reduce) {
  .card-face {
    transform: none !important;
    transition: none !important;
  }
}
</style>
