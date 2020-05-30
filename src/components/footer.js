import React, { Component } from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"

export class Footer extends Component {
  render() {
    return (
      <section className="footer-wrapper pad-50 bg-lightblue style-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="text-center">
                <ul className="social-share list-inline">
                  <li className="list-inline-item">
                    <Link to="/">
                      <span className="icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </span>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <span className="icon">
                        <FontAwesomeIcon icon={faTwitter} />
                      </span>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <span className="icon">
                        <FontAwesomeIcon icon={faGooglePlusG} />
                      </span>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 widget text-center">
              <p className="copyright">
                Copyrights © {new Date().getFullYear()} <b>Mitesh Patel</b>
                <br />
                All Rights Reserved.
                , Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Footer