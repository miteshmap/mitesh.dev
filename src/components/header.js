import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import { Link } from "gatsby"

export class Header extends Component {
  render() {
    return (
      <header id="header" className="fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">

          <h1 className="logo">
            <Link to="/">Mitesh Patel</Link>
          </h1>
          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="https://drive.google.com/open?id=1-SkcMGMlewHEtHm7hAKTvUkYFrbmItfr">Resume</Link>
              </li>
              <li>
                <a href="mailto:miteshmap@gmail.com">contact</a>
              </li>
            </ul>
          </nav>
          <div className="header-social-links">
            <Link to="/" className="twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link to="/" className="facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link to="/" className="linkedin">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
          </div>
        </div>
      </header >
    )
  }
}

export default Header
