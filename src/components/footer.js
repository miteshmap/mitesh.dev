import React, { Component } from "react"
import { Link } from "gatsby"

export class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="container">
          <div className="copyright">
            Copyrights © {new Date().getFullYear()} <b>Mitesh Patel</b>. All Rights Reserved.
          </div>
          <div className="credits">
            Built with {` `} <Link to="https://www.gatsbyjs.org">Gatsby</Link>
          </div>
        </div>
      </footer >
    )
  }
}

export default Footer