import React from "react"
import Footer from "./footer"
import Header from "./header"

import "bootstrap/dist/css/bootstrap.css"
import "./base.css"

const Layout = ({ children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div className="container">
      <Header />
      <main>
        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
