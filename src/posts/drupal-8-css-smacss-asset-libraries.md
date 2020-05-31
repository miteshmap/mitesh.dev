---
title: "Drupal 8: css SMACSS asset libraries"
path: "/drupal-8-css-smacss-asset-libraries"
date: "2018-04-15"
author: "Mitesh Patel"
excerpt: "In this blog we are going discuss about, how css are added in themes and modules using asset libraries (with module_name.libraries.yml file). Outwardly It’s pretty simple, you create a module_name.libraries.yml file and add a key and add css and js with the library. like,."
tags: ["Drupal 8", "Drupal", "css", "SMACSS"]
references:
  [
    "https://smacss.com/",
    "https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module",
    "https://www.drupal.org/node/1887918#separate-concerns",
    "https://www.drupal.org/node/1921610",
    "https://www.drupal.org/node/1887922",
  ]
---

In this blog we are going discuss about, how css are added in themes and modules using asset libraries (with module_name.libraries.yml file).

Outwardly It’s pretty simple, you create a module_name.libraries.yml file and add a key and add css and js with the library. like,

```yaml
example:
  css:
    theme:
      css/example.css: {}
  js:
    js/example.js: {}
```

But have you ever think, why “theme” key is used here? It’s not just because it’s related to theme. But actually Drupal 8 has defined weight for the key like “theme”, In total there are 5 different keys and so does 5 different weights. That is based on “Smacks”, yes, you read it right. But it is spelled [SMACSS](https://smacss.com/). Actually it’s nothing but a style guide to categorise CSS, there are five types of categories:

1. Base
2. Layout
3. Module (“Component” in Drupal)
4. State
5. Theme

And all of these types are loaded according to different weightage defined in Drupal. And these are strict keys you cannot use any random word as key. Now let’s see how Drupal has defined weights for each category.

- **base**: CSS reset/normalize plus HTML element styling.
  - CSS_BASE = -200
- **layout**: macro arrangement of a web page, including any grid systems.
  - CSS_LAYOUT = -100
- **component**: discrete, reusable UI elements.
  - CSS_COMPONENT = 0
- **state**: styles that deal with client-side changes to components.
  - CSS_STATE = 100
- **theme**: purely visual styling (“look-and-feel”) for a component.
  - CSS_THEME = 200

Now, the question is, Why do you need to follow these standard? The short answer to this question is, To make aggregation strategy more linear. These is it? No, There are many other factors, explained in this issue. [https://www.drupal.org/node/1921610](https://www.drupal.org/node/1921610)

For the blog, Let’s stick to the usage of the keys.

## CSS files for Drupal modules:

For any custom module css file must be placed into “css/” folder. And according to doc, you can follow any of these naming standard for module css:

- MODULE_NAME.module.css: This includes layout, component and state styles.
- MODULE_NAME.theme.css: This just contains theme styles.
- MODULE_NAME.admin.css: This includes layout, component and state styles for admin screen.
- MODULE_NAME.admin.theme.css: This just contains theme styles.

## CSS files for Drupal themes:

For theme you must follow the keys to define each css type. You may want to create a separate file for each component / layout / states etc.. and that may look like this file.

```yaml
themename:
  base:
    css/base/base.css: {}
    css/base/core.css: {}
  layout:
    css/layout/layout.css: {}
    css/layout/layout--mobile.css: {}
    css/layout/layout--tablet.css: {}
  component:
    css/components/form.css: {}
    css/components/button.css: {}
    css/components/pagination.css: {}
  theme:
    css/theme/theme.css: {}
    css/theme/styles.css: {}
```

So, Next time when you write your custom theme or module, I hope you will follow these standards to add css.

## TL;DR

Drupal 8 follows SMACSS standards to write css with asset libraries. When you write module or theme, css should be categorised based on those [categories](https://mitesh.dev/blog/drupal-8-css-smacss-asset-libraries#smcass-categories).
