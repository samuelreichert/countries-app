import './Header.css'

interface HeaderProps { darkMode: boolean; onToggleDarkMode: () => void }

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return <header className="header"><div className="header__content"><h1>Where in the world?</h1><button className="theme-toggle" type="button" onClick={onToggleDarkMode}><span aria-hidden="true">{darkMode ? '☀' : '◔'}</span>{darkMode ? 'Light Mode' : 'Dark Mode'}</button></div></header>
}
