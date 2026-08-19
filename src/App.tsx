import { useEffect, useMemo, useState } from 'react'
import { getAllCountries } from './api/countries'
import CountryDetails from './components/CountryDetails/CountryDetails'
import CountriesGrid from './components/CountriesGrid/CountriesGrid'
import Header from './components/Header/Header'
import type { Country } from './types/country'
import './App.css'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('countries:dark-mode') === 'true')
  const [countries, setCountries] = useState<Country[]>([])
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getAllCountries(controller.signal).then(setCountries).catch((requestError: unknown) => {
      if (!(requestError instanceof DOMException && requestError.name === 'AbortError')) {
        setError(requestError instanceof Error && requestError.message === 'Missing VITE_REST_COUNTRIES_API_KEY'
          ? 'Add VITE_REST_COUNTRIES_API_KEY to .env.local, then restart the app.'
          : 'Countries could not be loaded. Please check your connection and try again.')
      }
    })
    return () => controller.abort()
  }, [])

  const visibleCountries = useMemo(() => {
    const searchTerm = query.trim().toLocaleLowerCase()
    return countries.filter((country) => (!region || country.region === region) && (!searchTerm || country.name.common.toLocaleLowerCase().includes(searchTerm)))
  }, [countries, query, region])

  const toggleDarkMode = () => setDarkMode((value) => {
    localStorage.setItem('countries:dark-mode', String(!value))
    return !value
  })

  return <div className={`app ${darkMode ? 'app--dark' : ''}`}>
    <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
    <main className="app__main">
      {selectedCountry ? <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} /> : <>
        <div className="filters" aria-label="Country filters">
          <label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a country…" /></label>
          <label className="region-field"><span className="sr-only">Filter by region</span><select value={region} onChange={(event) => setRegion(event.target.value)}><option value="">Filter by Region</option>{regions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </div>
        {error ? <p className="status-message" role="alert">{error}</p> : <CountriesGrid countries={visibleCountries} loading={!countries.length} onSelect={setSelectedCountry} />}
      </>}
    </main>
  </div>
}
