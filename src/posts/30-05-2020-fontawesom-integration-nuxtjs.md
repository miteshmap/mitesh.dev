---
title: "Font Awesome integration with nuxt.js"
path: "/font-awesome-integration-with-nuxtjs"
date: "2020-05-30"
author: "Mitesh Patel"
excerpt: "Font Awesome integration with Nuxt.js..."
tags: ["savings", "javascript", "investment"]
---

[Font Awesome](https://fontawesome.com/) is a gret libary for icons, It provide a lot of icons free for site. svg icons are easy to use with any theme.

In this article, we’ll go through the process of integratin Font Awesome icons in a Nuxt.js application. A package that we are going to use is available here - https://www.npmjs.com/package/@nuxtjs/fontawesome

Install all the required packages:

```bash
npm install -D @nuxtjs/fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```

Now, Add `@nuxtjs/fontawesome` to `buildModules` in your `nuxt.config.js`

```JavaScript
buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module',
    //'@nuxtjs/style-resources',
    '@nuxtjs/fontawesome',
  ],
```

And add the configuration as follow.

```JavaScript
fontawesome: {
  component: 'fa',
  suffix: true,
  icons: {
    solid: true,
    brands: [
      'faFacebook',
      'faTwitter',
      'faLinkedin',
      'faYoutube',
      'faInstagram'
    ]
  },
},
```

`component` key in is used to rename component name, Here we're renaming it to fa and suffix means if we want to add suffixes or not like `-icon`, `-layers` etc..

add all the fonts that we want to include to avoid any unnnecessary imports. and in the component file we can use it as,

```JavaScript
// If suffix is true,
<fa-icon :icon="['fab', 'facebook']" />

// Otherwise
<fa :icon="['fab', 'facebook']" />
```

Here `fab` is for font awesome `brands` icons, for solid icon we have to use `fas`.

Ref: https://blog.logrocket.com/full-guide-to-using-font-awesome-icons-in-vue-js-apps-5574c74d9b2d/