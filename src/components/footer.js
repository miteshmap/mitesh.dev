import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ title }) => (
  <footer>
    <>
      <span className="footerCopyrights">
        Copyright © {new Date().getFullYear()}  {title}.
        Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
      </span>
      <span className="footerCopyrights">
        Starter created by <a href="https://radoslawkoziel.pl">panr</a>
      </span>
    </>
  </footer>
)

Footer.propTypes = {
  title: PropTypes.string,
}

export default Footer
