import { useEffect, useState } from 'react'
import { getCountriesByCode, getCountryByCode } from '../../api/countries'
import type { Country } from '../../types/country'
import './CountryDetails.css'

interface CountryDetailsProps { country: Country; onBack: () => void }
const formatList = (values?: Record<string, string>) => values ? Object.values(values).join(', ') : '—'
const formatCurrencies = (values?: Country['currencies']) => values ? Object.values(values).map((currency) => currency.name).join(', ') : '—'

export default function CountryDetails({ country: initialCountry, onBack }: CountryDetailsProps) {
  const [country, setCountry] = useState<Country>(initialCountry)
  const [borderCountries, setBorderCountries] = useState<Country[]>([])

  useEffect(() => {
    const controller = new AbortController()
    getCountryByCode(initialCountry.cca3, controller.signal).then(setCountry).catch(() => setCountry(initialCountry))
    return () => controller.abort()
  }, [initialCountry])

  useEffect(() => {
    const controller = new AbortController()
    getCountriesByCode(country.borders || [], controller.signal).then(setBorderCountries).catch(() => setBorderCountries([]))
    return () => controller.abort()
  }, [country.borders])

  const nativeNames = country.name.nativeName && Object.fromEntries(Object.entries(country.name.nativeName).map(([key, value]) => [key, value.common]))

  return <section className="country-details">
    <button className="back-button" type="button" onClick={onBack}><span aria-hidden="true">←</span> Back</button>
    <div className="country-details__content">
      <img src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} />
      <div className="country-details__info">
        <h2>{country.name.common}</h2>
        <div className="country-details__facts">
          <dl><div><dt>Native Name:</dt><dd>{formatList(nativeNames)}</dd></div><div><dt>Population:</dt><dd>{new Intl.NumberFormat('en-US').format(country.population)}</dd></div><div><dt>Region:</dt><dd>{country.region}</dd></div><div><dt>Sub Region:</dt><dd>{country.subregion || '—'}</dd></div><div><dt>Capital:</dt><dd>{country.capital?.join(', ') || '—'}</dd></div></dl>
          <dl><div><dt>Top Level Domain:</dt><dd>{country.tld?.join(', ') || '—'}</dd></div><div><dt>Currencies:</dt><dd>{formatCurrencies(country.currencies)}</dd></div><div><dt>Languages:</dt><dd>{formatList(country.languages)}</dd></div></dl>
        </div>
        <div className="border-countries"><b>Border Countries:</b>{borderCountries.length ? borderCountries.map((border) => <span key={border.cca3}>{border.name.common}</span>) : <em>None</em>}</div>
      </div>
    </div>
  </section>
}
