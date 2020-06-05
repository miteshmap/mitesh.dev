---
title: "Javascript Promise to Rescue"
path: "/javascript-promise-rescue"
date: "2019-02-05"
author: "Mitesh Patel"
excerpt: "Recently I came across a situation in Drupal, where I'm asking user for location permission, and then I display some output based on their lat/long (displaying formatted address using google map api). so, When user visits the site next time, the result could be displayed based on location."
tags: ["Drupal", "javascript", "promise", "geolocation"]
references:
  [
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  ]
---

Recently I came across a situation in Drupal, where I'm asking user for location permission, and then I display some output based on their lat/long (displaying formatted address using google map api). so, When user visits the site next time, the result could be displayed based on location.

But while doing that I got into situation where the javascript, Which is capturing the lat and long and displaying the result based on location I ran into a situation where the address formatter function invoked before google map api gets loaded. Thus, I was facing the error `google is not defined`, To avoid this, I was looking into a robust solution. using setTimeout and setInterval was doing the trick that I was looking for. But I was looking something that can be done inside formatter function, That uses the google object to display formatted address based on lat ad long instead of doing it in caller function.

```javascript
try {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCall, ErrorCall, {
      timeout: 10000,
    });
  }
} catch (e) {
  // Empty.
}

// Success call back
successCall = function(position) {
  var coords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  geoPerm = true;
  format_address(coords, $("#somediv"));
};

// Error callback
ErrorCall = function(error) {
  geoPerm = false;
};

// Format address function called from successCall.
function format_address(coords, mydiv) {
  if (Drupal.geolocation.maps_api_loading) {
    var do_wait = setInterval(function() {
      if (Drupal.geolocation.maps_api_loading === false) {
        clearInterval(do_wait);
        format_address(coords, mydiv);
      }
    }, 100);
  } else {
    getFormattedAddress(coords, mydiv);
    // And many other functionalities.
  }
}
```

But, This feels like an ugly way to do this, as we are calling the function itself, inside setInterval.

This is when my colleague pointed out to Promise.So, with Promise the final function looks a lot more cleaner.

```javascript
// Format address function called from successCall.
function format_address(coords, mydiv) {
  new Promise(function(resolve, reject) {
    var do_wait = setInterval(function() {
      if (Drupal.geolocation.maps_api_loading === false) {
        clearInterval(do_wait);
        resolve();
      }
    }, 100);
  }).then(function() {
    getFormattedAddress(coords, mydiv);
    // And many other functionalities.
  });
}
```

whenever I call this function it will always check for `Drupal.geolocation.maps_api_loading` and wait for it to load, when it's not loaded. with Promise it looks much cleaner and easier way to handle such kind of dependencies, to avoid javascript to be get executed on page load. when other dependencies are not available.
