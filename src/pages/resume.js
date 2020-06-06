import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import SEO from '../components/seo';
import Layout from '../components/layout'
import style from '../styles/navigation.module.css'

export default class Resume extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const pageToggle = () => {
      if (pageNumber === 1) {
        this.setState({ pageNumber: 2 });
      } else {
        this.setState({ pageNumber: 1 });
      }
      return 1;
    };

    return (
      <>
        <SEO
          title="Resume"
          description="My resume consists of my biodata of experience. You can hire me if you feel
          I'm good for any position in your organization. I'm open to various challenges that come
          in the way of building various web applications."
          path="resume"
        />
        <Layout>
          <div className={style.navigation} style={{ marginTop: "0px" }}>
            <a href="../resume.pdf" download="resume-mitesh-patel.pdf" target="_blank">
              Download PDF
            </a>
          </div>
            <Document
              file="../resume.pdf"
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
            <Page pageNumber={pageNumber} scale={window.innerWidth > 768 ? 1.5 : 1.0}/>
          </Document>
          <div className={style.navigation} style={{ marginTop: "0px" }}>
            <span className={style.button}>
              <a onClick={pageToggle}>
                {pageNumber === 1 ? (
                    <>
                      <span className={style.buttonText}>Next Page</span>
                      <span className={style.iconNext}>→</span>
                    </>
                  ) : (
                    <>
                      <span className={style.iconPrev}>←</span>
                      <span className={style.buttonText}>Previous Page</span>
                    </>
                )}
              </a>
            </span>
          </div>
        </Layout>
      </>
    );
  }
}
