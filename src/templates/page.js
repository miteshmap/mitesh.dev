import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { toKebabCase } from '../helpers'

import style from '../styles/post.module.css'


const PageTemplate = ({ data }) => {
  const {
    frontmatter: { title, coverImage, excerpt, tags },
    excerpt: autoExcerpt,
    html,
  } = data.markdownRemark

  return (
    <Layout>
      <SEO title={title} description={excerpt || autoExcerpt} keywords={tags || []} />
      <div className={style.post}>
        <div className={style.postContent}>
          <div className={style.meta}>
            {tags ? (
              <div className={style.tags}>
                {tags.map(tag => (
                  <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
                    <span className={style.tag}>#{tag}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {coverImage && (
            <Img
              fluid={coverImage.childImageSharp.fluid}
              className={style.coverImage}
            />
          )}

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}

export default PageTemplate

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        excerpt
        tags
        coverImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
      excerpt
    }
  }
`
