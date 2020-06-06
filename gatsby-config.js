const postCssPresetEnv = require(`postcss-preset-env`)
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const cssnano = require('cssnano')
const postCSSMixins = require('postcss-mixins')

module.exports = {
  siteMetadata: {
    title: `Mitesh Patel`,
    description: `My personal space to share my learnings.`,
    copyrights: '',
    author: `Mitesh Patel`,
    logo: {
      src: '',
      alt: '',
    },
    logoText: 'Mitesh Patel',
    defaultTheme: 'light',
    postsPerPage: 5,
    mainMenu: [
      {
        title: 'Articles',
        path: '/',
      },
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'snippets',
        path: '/snippets',
      },
      {
        title: 'Resume',
        path: '/resume',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-117542392-1',
        head: true,
      },
    },
    `babel-preset-gatsby`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/snippets`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 1,
            preserve: false,
          }),
          cssnano({
            preset: 'default',
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              // the github handler whose gists are to be accessed
              username: 'miteshmap',
              // includeDefaultCss: true
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mitesh patel`,
        short_name: `miteshmap`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `minimal-ui`,
        icon: `src/images/hello-icon.png`,
      },
    },
  ],
}
