import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDrupal,
  faTwitter,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const Footer = ({ title }) => (
  <footer>
    <>
      <div className="social-links">
        <ul>
          <li>
            <a href="mailto:miteshmap@gmail.com">
              <span className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </a>
          </li>
          <li>
            <a href="https://github.com/miteshmap" target="_blank" rel="noreferrer">
              <span className="icon">
                <FontAwesomeIcon icon={faGithub} />
              </span>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/miteshmap" target="_blank" rel="noreferrer">
              <span className="icon">
                <FontAwesomeIcon icon={faTwitter} />
              </span>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/miteshmap" target="_blank" rel="noreferrer">
              <span className="icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </span>
            </a>
          </li>
          <li>
            <a href="https://drupal.org/u/miteshmap" target="_blank" rel="noreferrer">
              <span className="icon">
                <FontAwesomeIcon icon={faDrupal} />
              </span>
            </a>
          </li>
        </ul>
      </div>
      <span className="footerCopyrights">
        Copyright © {new Date().getFullYear()}  {title}.
        Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
      </span>
    </>
  </footer>
)

Footer.propTypes = {
  title: PropTypes.string,
}

export default Footer
