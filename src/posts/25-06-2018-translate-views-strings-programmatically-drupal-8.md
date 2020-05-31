---
title: "Translate views strings programmatically in Drupal 8"
path: "/translate-views-strings-programmatically-drupal-8"
date: "2018-06-25"
author: "Mitesh Patel"
excerpt: "In Drupal 8 views translation can be added from back end using views ui. You just need to enable the 'Configuration Translation' module."
tags: ["Drupal 8", "Drupal", "Multilingual", "Configuration translation"]
---

In Drupal 8 views translation can be added from back end using views ui. You just need to enable the "Configuration Translation" module.

Then visit the views lists page, you will see a "Translate view" link for each views in links dropdown. Click on the link and you will see a page like this.

Image removed.

you will see separate section for header / footer / fields / filters / sorts translations. You can edit the labels in your selected language for any section.

But, Sometimes you need to install translation programmatically when installing the module in hook_install. so, without managing \*.po file you can add translation by adding following lines of code.

```php
<?php

$view_translate = \Drupal::languageManager()->getLanguageConfigOverride('ar', 'views.view.stores_finder');
$view_translate->set('display.page_1.display_options.fields.field_name.label', 'اسم الحقل');
$view_translate->set('display.page_2.display_options.filters.field_name.label', 'اسم الحقل');
$view_translate->set('display.block_1.display_options.fields.field_name.label', 'اسم الحقل');
$view_translate->save();
```
