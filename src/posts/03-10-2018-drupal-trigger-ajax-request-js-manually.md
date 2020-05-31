---
title: "Drupal: Trigger ajax request in js manually"
path: "/drupal-trigger-ajax-request-js-manually"
date: "2018-10-03"
author: "Mitesh Patel"
excerpt: "In Drupal, You can trigger ajax call for any html element and anchor links with a specific implementation explained..."
tags: ["Drupal 8", "Drupal", "ajax"]
references:
  ["https://api.drupal.org/api/drupal/core%21core.api.php/group/ajax/8.5.x"]
---

In Drupal, You can trigger ajax call for any html element and anchor links with a specific implementation explained at https://api.drupal.org/api/drupal/core%21core.api.php/group/ajax/8.5.x. But some time you may want to trigger some ajax request on a button or non ajaxed anchor tag.

That means a manual trigger of ajax request. like, we normally do in jQuery. You can do the same, by using function "Drupal.ajax" as described in following script. "Drupal.ajax" creates and returns the object of Drupal.Ajax and by calling ".execute()", it actually triggers the ajax request.

```javascript
$(".foo-class", context)
  .find("a.some-class")
  .on("click", function(e) {
    var yourCustomAjaxCall = Drupal.ajax({
      url: Drupal.url("module/your-custom-path"),
      element: $(this).get(0),
      base: false,
      progress: { type: "throbber" },
      submit: { js: true }, // Only if you are submitting data. ignore otherwise.
    });

    // (optional) Custom command function to execute on success.
    yourCustomAjaxCall.commands.afterAjaxCall = function(
      ajax,
      response,
      status,
    ) {
      if (status === "success") {
        console.log("successfully executed.");
      }
    };
    yourCustomAjaxCall.execute();

    return false;
  });
```

`yourCustomAjaxCall.commands.afterAjaxCall` The function that we defined for after ajax request, is optional. without that, you can use it like:

```javascript
$(".foo-class", context)
  .find("a.some-class")
  .on("click", function(e) {
    Drupal.ajax({
      url: Drupal.url("module/your-custom-path"),
      element: $(this).get(0),
      base: false,
      progress: { type: "throbber" },
    }).execute();

    return false;
  });
```
