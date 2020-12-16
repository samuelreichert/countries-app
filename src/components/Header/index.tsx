import React, { useState } from 'react'
import { HeaderWrapper, Title, ToggleMode } from './index.styles'

const Header = () => {
  const localDarkMode = localStorage.getItem('DARK_MODE') === 'true'
  const [darkMode, setDarkMode] = useState(localDarkMode)

  const modeIcon = darkMode ? 'fa-sun' : 'fa-moon'
  const modeText = darkMode ? 'Light Mode' : 'Dark Mode'

  const toggleMode = () => {
    localStorage.setItem('DARK_MODE', JSON.stringify(!darkMode))
    setDarkMode(!darkMode)
  }

  return (
    <HeaderWrapper>
      <Title>Where in the world?</Title>

      <ToggleMode onClick={toggleMode}>
        <i className={`far ${modeIcon}`}></i>
        <span>{ modeText }</span>
      </ToggleMode>
    </HeaderWrapper>
  )
}

export default Header
