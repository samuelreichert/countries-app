import type { Country } from '../../types/country'
import './CountriesGrid.css'

interface CountriesGridProps { countries: Country[]; loading: boolean; onSelect: (country: Country) => void }
const formatNumber = (number: number) => new Intl.NumberFormat('en-US').format(number)

export default function CountriesGrid({ countries, loading, onSelect }: CountriesGridProps) {
  if (loading) return <div className="countries-grid countries-grid--loading" aria-label="Loading countries">{Array.from({ length: 8 }, (_, index) => <div className="country-card country-card--skeleton" key={index} />)}</div>
  if (!countries.length) return <p className="empty-state">No countries match those filters.</p>
  return <div className="countries-grid">{countries.map((country) => <button type="button" className="country-card" onClick={() => onSelect(country)} key={country.cca3}><img src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} /><span className="country-card__content"><strong>{country.name.common}</strong><span><b>Population:</b> {formatNumber(country.population)}</span><span><b>Region:</b> {country.region}</span><span><b>Capital:</b> {country.capital?.join(', ') || '—'}</span></span></button>)}</div>
}
