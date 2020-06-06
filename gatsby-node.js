const { paginate } = require('gatsby-awesome-pagination')
const { forEach, uniq, filter, not, isNil, flatMap } = require('rambdax')
const path = require('path')
const { toKebabCase } = require('./src/helpers')

const pageTypeRegex = /src\/(.*?)\//
const getType = node => node.fileAbsolutePath.match(pageTypeRegex)[1]

const pageTemplate = path.resolve(`./src/templates/page.js`)
const postTemplate = path.resolve(`./src/templates/post.js`)
const snippetsTemplate = path.resolve(`./src/templates/snippets.js`)
const indexTemplate = path.resolve(`./src/templates/index.js`)
const tagsTemplate = path.resolve(`./src/templates/tags.js`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    if (node.fileAbsolutePath.indexOf('/posts/') !== -1) {
      createNodeField({
        node,
        name: `slug`,
        value: `/blog${node.frontmatter.path}`,
      })
    }

    if (node.fileAbsolutePath.indexOf('/snippets/') !== -1) {
      createNodeField({
        node,
        name: `slug`,
        value: `/snippets${node.frontmatter.path}`,
      })
    }
  }
}

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions
  const allNodes = getNodes()

  return graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000,
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
            }
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      allMarkdownRemark: { edges: markdownPages },
      site: { siteMetadata },
    } = result.data

    // Create each markdown pages
    const sitePages = markdownPages.filter(({ node }) => !node.fields)

    forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
        context: {
          type: getType(node),
        },
      })
    }, sitePages)


    const AllSnippets = allNodes.filter(
      ({ internal, fileAbsolutePath }) =>
        internal.type === 'MarkdownRemark' &&
        fileAbsolutePath.indexOf('/snippets/') !== -1,
    )

    // Create posts index with pagination
    paginate({
      createPage,
      items: AllSnippets,
      component: snippetsTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/snippets',
    })

    const snippetsPosts = markdownPages.filter(({ node }) => node.fields && node.fileAbsolutePath.indexOf('/snippets/') !== -1)

    // Create each markdown snippets
    forEach(({ node }, index) => {
      const previous = index === 0 ? null : snippetsPosts[index - 1].node
      const next = index === snippetsPosts.length - 1 ? null : snippetsPosts[index + 1].node

      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: {
          type: getType(node),
          next,
          previous,
        },
      })
    }, snippetsPosts)

    const posts = allNodes.filter(
      ({ internal, fileAbsolutePath }) =>
        internal.type === 'MarkdownRemark' &&
        fileAbsolutePath.indexOf('/posts/') !== -1,
    )

    // Create posts index with pagination
    paginate({
      createPage,
      items: posts,
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    const blogPosts = markdownPages.filter(({ node }) => node.fields && node.fileAbsolutePath.indexOf('/posts/') !== -1)

    // Create each markdown post
    forEach(({ node }, index) => {
      const previous = index === 0 ? null : blogPosts[index - 1].node
      const next = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node

      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: {
          type: getType(node),
          next,
          previous,
        },
      })
    }, blogPosts)

    // Create tag pages
    const tags = filter(
      tag => not(isNil(tag)),
      uniq(flatMap(post => post.frontmatter.tags, posts)),
    )

    forEach(tag => {
      const postsWithTag = posts.filter(
        post =>
          post.frontmatter.tags && post.frontmatter.tags.indexOf(tag) !== -1,
      )

      paginate({
        createPage,
        items: postsWithTag,
        component: tagsTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/tag/${toKebabCase(tag)}`,
        context: {
          tag,
        },
      })
    }, tags)

    return {
      markdownPages,
      tags,
    }
  })
}

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
      title: String!
      author: String
      date: Date! @dateformat
      path: String!
      tags: [String!]
      excerpt: String
      coverImage: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}
