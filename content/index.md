---
seo:
  title: Laravel Access Control - Lomkit
  description: |
    Laravel Access Control centralize your application security.
    One place configuration, whole application secured!
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

#title
Secure your app the easy way !

#description
Laravel Access Control regroups all security needs in order to make them work together. Avoid wasting time and missing some application's parts.

#links
  :::u-button
  ---
  size: xl
  to: /getting-started
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
  to: https://github.com/lomkit/laravel-access-control
  variant: subtle
  ---
  Star on github
  :::
:::

:::u-page-section
#title
All-in-one security configuration

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-laravel
  ---
  #title
  Laravel
  
  #description
  Fully integrates with Laravel to make it even more easy to use.
  :::

  :::u-page-feature
  ---
  icon: icon-park-outline:easy
  ---
  #title
  Easy to configure
  
  #description
  One place configuration to impact your whole application.
  :::

  :::u-page-feature
  ---
  icon: si:checklist-line
  ---
  #title
  Clean code
  
  #description
  Keep your application clean as it grows
  :::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-6 py-6
title: First setup
id: first-setup
---
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-6 py-6
title: Create your Perimeters
description: |
  Perimeters defines the functional scopes of your application. They help you structure accesses.
  Here we will create two simple perimeters for either global access and user related only access
orientation: horizontal
variant: naked
links:
  - label: Learn more
    to: /essentials/perimeters
    target: _blank
    color: neutral
---
:::prose-pre
---
code: php artisan make:perimeter GlobalPerimeter
filename: Terminal
---
```bash
php artisan make:perimeter GlobalPerimeter
php artisan make:perimeter OwnPerimeter
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-6 py-6
title: Create your Control
description: |
  Control handles the security around the given model using the concerned perimeters.
  We here want to control our Post model.
orientation: horizontal
reverse: true
variant: naked
links:
  - label: Learn more
    to: /essentials/controls
    target: _blank
    color: neutral
---
:::prose-pre
---
code: php artisan make:control PostControl
filename: Terminal
---
```bash
  php artisan make:control PostControl
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-6 py-6
title: Configure your Control
description: |
  Specify if the perimeter should apply for the specified user and the concerned security check if so.
  For each perimeters in our PerimeterControl file, we want to configure if the perimeter should apply for the specified users
  and the security itself on queries / policies.
orientation: horizontal
variant: naked
---
:::prose-pre
---
filename: PostControl.php
---
```php
    class PostControl extends Control
    {
      protected function perimeters(): array
      {
        return [
          GlobalPerimeter::new()
            ->allowed(function (Model $user, string $method) {
              return $user->can(sprintf('%s global models', $method));
            })
            ->should(function (Model $user, Model $model) {
              return true;
            })
            ->query(function (Builder $query, Model $user) {
              return $query;
            }),
          OwnPerimeter::new()
            ->allowed(function (Model $user, string $method) {
              return $user->can(sprintf('%s own models', $method));
            })
            ->should(function (Model $user, Model $model) {
              return $model->user()->is($user);
            })
            ->query(function (Builder $query, Model $user) {
              return $query->where('user_id', $user->getKey());
            }),
        ];
      }
    }
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-6 py-6
title: You are ready to go !
description: Enjoy the full power of access control.
orientation: horizontal
variant: naked
reverse: true
---
:::prose-pre
---
code: php artisan make:perimeter GlobalPerimeter
filename: ModelController.php
---
```php
// Apply the Control to the query
App\Models\Post::controlled()->get()

// Check if the user can view the post according to the policy
$user->can('view', App\Models\Post::first())
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-6 py-6
---
#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /getting-started
  trailingIcon: i-lucide-arrow-right
  ---
  Get started
  :::
