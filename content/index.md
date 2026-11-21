---
title: Laravel Access Control
description: "Same posts, different eyes. Write once who can see and edit which rows: your lists, Edit buttons and search follow."
seo:
  title: "Laravel Access Control: same posts, different eyes"
  description: "Laravel Access Control is a Laravel package: write once who can see and edit which rows of each Eloquent model, and your policies, queries, Scout searches and laravel-rest-api resources follow."
---

Laravel Access Control is a Laravel package that declares in one control who can see and change each Eloquent model. The same control drives the policy behind `$user->can()`, the `controlled()` scope that filters your queries in SQL, the filter of your Laravel Scout searches and the row restriction of your laravel-rest-api resources, so each access rule lives in one place.
