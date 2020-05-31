import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from './icon'

import style from '../styles/menu.module.css'

const MainMenu = ({ mainMenu }) => {
  const menu = mainMenu.slice(0)

  return menu.map((menuItem, index) => {
    const internal = /^\/(?!\/)/.test(menuItem.path)
    return (
      <li key={index}>
        {internal ? (
          <Link to={menuItem.path}>{menuItem.title}</Link>
        ) : (
            <a href={menuItem.path}>
              {menuItem.title}
            </a>
          )
        }
      </li>
    )
  })
}

const menuIcon = `M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z`
const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`

const Menu = ({
  mainMenu,
  isMobileMenuVisible,
  onToggleMobileMenu,
  onChangeTheme,
}) => {

  return (
    <>
      <div className={style.mobileMenuContainer}>
        <>
          {isMobileMenuVisible ? (
            <>
              {/* eslint-enable */}
              <ul className={style.mobileMenu}>
                <MainMenu mainMenu={mainMenu} isMobileMenu />
              </ul>
              {/* eslint-disable */}
              <div
                onClick={onToggleMobileMenu}
                className={style.mobileMenuOverlay}
              />
            </>
          ) : null}
          <button
            className={style.menuTrigger}
            style={{ color: 'inherit' }}
            onClick={onToggleMobileMenu}
            type="button"
            aria-label="Menu"
          >
            <Icon style={{ cursor: 'pointer' }} size={24} d={menuIcon} />
          </button>
        </>
      </div>
      <div className={style.desktopMenuContainer}>
        <ul className={style.menu}>
          <MainMenu mainMenu={mainMenu} />
        </ul>
      </div>
      <button
        className={style.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon style={{ cursor: 'pointer' }} size={24} d={toggleIcon} />
      </button>
    </>
  )
}

Menu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  mainMenuItems: PropTypes.number,
  isMobileMenuVisible: PropTypes.bool,
  onToggleMobileMenu: PropTypes.func,
  onChangeTheme: PropTypes.func,
}

export default Menu
