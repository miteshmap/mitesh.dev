import React, { Component } from "react"
import logoImg from "../../content/assets/logo.png"
import { Link } from "gatsby"

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          <img src={logoImg} alt="" />
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link to="https://drive.google.com/open?id=1-SkcMGMlewHEtHm7hAKTvUkYFrbmItfr" className="nav-link">Resume</Link>
            </li>
            <li className="nav-item">
              <a href="mailto:miteshmap@gmail.com" className="nav-link">contact</a>
            </li>

          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
