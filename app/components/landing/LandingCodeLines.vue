<script setup lang="ts">
const props = withDefaults(defineProps<{
  lines: string[]
  lineClass?: (index: number) => Record<string, boolean>
  scrollOnPhone?: boolean
}>(), {
  lineClass: () => ({}),
  scrollOnPhone: false
})

defineSlots<{
  after?: (props: { index: number }) => unknown
}>()

/** Leading spaces become padding, so a wrapped line keeps the indentation of the code. */
const rows = computed(() => props.lines.map((line) => {
  const code = line.trimStart()

  return { indent: line.length - code.length, tokens: tokenizePhp(code) }
}))
</script>

<template>
  <div
    class="lcl"
    :class="{ 'lcl-scroll': scrollOnPhone }"
  >
    <div class="lcl-inner">
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="lcl-line"
        :class="lineClass(index)"
        :style="{ '--ind': row.indent }"
      >
        <span
          v-for="(token, position) in row.tokens"
          :key="position"
          :class="`lcl-${token.kind}`"
        >{{ token.text }}</span><span
          v-if="!row.tokens.length"
          aria-hidden="true"
        >&#8203;</span><slot
          name="after"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lcl {
  --lcl-plain: #383a42;
  --lcl-punct: #6b7280;
  --lcl-keyword: #a626a4;
  --lcl-type: #0184bc;
  --lcl-string: #3f7f3e;
  --lcl-number: #986801;
  --lcl-constant: #986801;
  --lcl-class: #b45309;
  --lcl-function: #3b6fd9;
  --lcl-variable: #d03b2f;
  --lcl-comment: #6b7280;
  --lcl-ch: 1ch;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11.5px;
  line-height: 1.65;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  color: var(--lcl-plain);
}

.dark .lcl {
  --lcl-plain: #d4d8e0;
  --lcl-punct: #8b93a3;
  --lcl-keyword: #c678dd;
  --lcl-type: #56b6c2;
  --lcl-string: #98c379;
  --lcl-number: #d19a66;
  --lcl-constant: #d19a66;
  --lcl-class: #e5c07b;
  --lcl-function: #61afef;
  --lcl-variable: #e06c75;
  --lcl-comment: #8b93a3;
}

.lcl-line {
  position: relative;
  padding-right: 14px;
  padding-left: calc((var(--ind, 0) + 4) * var(--lcl-ch) + 14px);
  text-indent: calc(-4 * var(--lcl-ch));
  white-space: pre-wrap;
  word-break: break-word;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 640px) {
  .lcl {
    --lcl-ch: 0.5ch;
    font-size: 11px;
  }

  /* On phones the code keeps its lines and scrolls sideways inside its block. */
  .lcl-scroll {
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .lcl-scroll .lcl-inner {
    width: max-content;
    min-width: 100%;
  }

  .lcl-scroll .lcl-line {
    padding-left: calc(var(--ind, 0) * var(--lcl-ch) + 12px);
    text-indent: 0;
    white-space: pre;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lcl-line {
    transition: none;
  }
}

.lcl-punct { color: var(--lcl-punct); }
.lcl-keyword { color: var(--lcl-keyword); }
.lcl-type { color: var(--lcl-type); }
.lcl-string { color: var(--lcl-string); }
.lcl-number { color: var(--lcl-number); }
.lcl-constant { color: var(--lcl-constant); }
.lcl-class { color: var(--lcl-class); }
.lcl-function { color: var(--lcl-function); }
.lcl-variable { color: var(--lcl-variable); }
.lcl-comment { color: var(--lcl-comment); font-style: italic; }
</style>
