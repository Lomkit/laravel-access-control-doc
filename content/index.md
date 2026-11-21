---
title: Laravel Access Control
description: "Declare once who can see and change which rows: a Laravel package whose controls drive your policies, your Eloquent queries and your Scout searches."
seo:
  title: "Laravel Access Control: declare once who can see and change which rows"
  description: "Laravel Access Control is a Laravel package that declares in one control who can see and change each Eloquent model: its perimeters drive the policies, the query scopes and the Scout searches."
---

:::u-page-hero
---
orientation: horizontal
---
  :::prose-pre
  ---
  code: composer require lomkit/laravel-access-control
  filename: Terminal
  ---
  ```bash
  composer require lomkit/laravel-access-control
  ```
  :::

#headline
  :::u-badge
  ---
  label: Laravel Access Control 1.0
  variant: subtle
  ---
  :::

#title
Declare once who can see and change which rows.

#description
Policies, queries and searches follow. Write one control for an Eloquent model: which users reach which rows, for each ability. Laravel Access Control turns it into the policy behind `$user->can()`, the `controlled()` scope that filters your queries in SQL, the filter of your Laravel Scout searches and the row restriction of your laravel-rest-api resources. They all read the same control, so each access rule lives in one place.

#links
  :::u-button
  ---
  size: xl
  to: /getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  target: _blank
  to: https://github.com/Lomkit/laravel-access-control
  variant: subtle
  ---
  GitHub
  :::
:::

:::u-page-section
#features
  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  ---
  #title
  One control per model

  #description
  Its perimeters say which users reach which rows, for each ability, as SQL constraints and as in-memory checks.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-git-fork
  ---
  #title
  One declaration, everywhere

  #description
  Automatic policies, `controlled()` queries, controlled Scout searches and the laravel-rest-api extension.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers
  ---
  #title
  Levels, boundaries and parents

  #description
  `Levels::of()` applies the highest level a user reaches, a boundary keeps every row inside the user's workspace or tenant, and `ThroughParent` gives a comment the access of its post.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-lock
  ---
  #title
  Fails closed

  #description
  No signed-in user, no perimeter or no boundary value means no row, and a missing declaration throws instead of opening rows.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list-checks
  ---
  #title
  Checked before production

  #description
  `php artisan access:check` reports what would throw, open or hide rows, and test assertions prove that the policy, the queries and the search agree on your test data.
  :::
:::
