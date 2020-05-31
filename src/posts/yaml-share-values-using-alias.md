---
title: "YAML: Share values using alias."
path: "/yaml-share-values-using-alias"
date: "2018-07-23"
author: "Mitesh Patel"
excerpt: "In YML often we use common values again and again for different purpose. For example, imagine the variation for image_styles for an e-commerce site and most places we use the same style for instance. There's a way to avoid duplication in yml."
tags: ["Drupal 8", "Drupal", "yaml"]
---

In YML often we use common values again and again for different purpose. For example, imagine the variation for image_styles for an e-commerce site and most places we use the same style for instance. There's a way to avoid duplication in yml. i.e.

```yaml
image_style:
  slider:
    width: 780
    height: 550
  teaser:
    width: 100
    height: 150
  carousel:
    width: 100
    height: 150
  main:
    width: 500
    height: 700
  fullscreen:
    width: 500
    height: 700
```

We are using the same value again for different keys. to avoid this we can give that key an alias (a string starting with &) and we refer that whenever needed by using asterisk (\*) sign before the alias, like.

```yaml
image_style:
  slider:
    width: 780
    height: 550
  teaser: &common_teaser
    width: 100
    height: 150
  carousel:
    <<: *common_teaser
  main: &full_image
    width: 500
    height: 700
  fullscreen:
    <<: *full_image
```

We can also add extra keys, and modify existing value in the alias when needed.

```yaml
image_style:
  slider:
    width: 780
    height: 550
  teaser: &common_teaser
    width: 100
    height: 150
  carousel:
    <<: *common_teaser
  main: &full_image
    width: 500
    height: 700
  fullscreen:
    <<: *full_image
    height: 600
    padding: 10
```

For a simple key-value yml file it will look like,

```yaml
- &test_data
  - 1
  - 2
- a
- b
- *test_data
```

which will output

```yaml
array(array(1, 2), a, b, array(1, 2))
```

we can also refer multiple aliases for a key:

```yaml
foo: &foo
  a: alpha
  b: beta
bar: &bar [1, 2, 3, 4]
check:
  <<:
    - *foo
    - *bar
check2:
  <<: [*foo , *bar]
```

both check and check2 returns the same output.

```php
array(
  'foo' => array('a' => 'alpha', 'b' => 'beta'),
  'bar' => array(1, 2, 3, 4),
  'check' => array('a' => 'alpha', 'b' => 'beta', 0 => 1, 1 => 2, 2 => 3, 3 => 4),
  'check2' => array('a' => 'alpha', 'b' => 'beta', 0 => 1, 1 => 2, 2 => 3, 3 => 4),
)
```
