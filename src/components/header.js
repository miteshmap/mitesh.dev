import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Menu from './menu'

import style from '../styles/header.module.css'

const Header = props => {
  const {
    siteLogo,
    logoText,
    mainMenu,
    defaultTheme,
  } = props
  const defaultThemeState =
    (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
    null
  const [userTheme, changeTheme] = useState(defaultThemeState)
  const [isMobileMenuVisible, toggleMobileMenu] = useState(false)
  const onChangeTheme = () => {
    const opositeTheme =
      (userTheme || defaultTheme) === 'light' ? 'dark' : 'light'

    changeTheme(opositeTheme)

    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', opositeTheme)
  }
  const onToggleMobileMenu = () => toggleMobileMenu(!isMobileMenuVisible)

  return (
    <>
      <Helmet>
        <body
          className={
            (userTheme || defaultTheme) === 'light'
              ? 'light-theme'
              : 'dark-theme'
          }
        />
      </Helmet>
      <header className={style.header}>
        <div className={style.inner}>
          <Link to="/">
            <div className={style.logo}>
              {siteLogo.src ? (
                <img src={siteLogo.src} alt={siteLogo.alt} />
              ) : (
                  <>
                    <span className={style.mark}>></span>
                    <span className={style.text}>{logoText}</span>
                    <span className={style.cursor} />
                  </>
                )}
            </div>
          </Link>
          <span className={style.right}>
            <Menu
              mainMenu={mainMenu}
              isMobileMenuVisible={isMobileMenuVisible}
              onToggleMobileMenu={onToggleMobileMenu}
              onChangeTheme={onChangeTheme}
            />
          </span>
        </div>
      </header>
    </>
  )
}

Header.propTypes = {
  siteLogo: PropTypes.object,
  logoText: PropTypes.string,
  defaultTheme: PropTypes.string,
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
}

export default Header
