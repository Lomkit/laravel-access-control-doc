<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const site = useSiteConfig()
const socialCard = `${site.url.replace(/\/$/, '')}/social-card.png`

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: socialCard,
  twitterImage: socialCard
})
</script>

<template>
  <div v-if="page">
    <LandingHero />

    <LandingBeforeAfter />

    <LandingApi />

    <LandingCta />
  </div>
</template>
