import React, { useEffect } from "react"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"
import AOS from "aos"
import Footer from "./footer"
import Header from "./header"
import "bootstrap/dist/css/bootstrap.css"
import "./base.css"

const Layout = ({ children }) => {

  useEffect(() => {
    // Initi AOS
    AOS.init({
      duration: 1000,
      once: true
    });

  }, [])

  return (
    <>
      <Helmet>
        <script src={withPrefix('jquery.min.js')} />
        <script src={withPrefix('main.js')} />
      </Helmet>
      <Header />
      <main>
        <section id="hero" className="d-flex align-items-center">
          <div className="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
            <h1>Mitesh Patel</h1>
            <h2>I'm a professional illustrator from San Francisco</h2>
            <a href="about.html" className="btn-about">About Me</a>
          </div>
        </section>
        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <div id="preloader"></div>
      <button className="back-to-top">
        <FontAwesomeIcon icon={faArrowCircleUp} />
      </button>
    </>
  )
}

export default Layout
