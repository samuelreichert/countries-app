import type { Country } from '../types/country'

const API_URL = 'https://api.restcountries.com/countries/v5'
const responseFields = [
  'names.common', 'names.official', 'names.native', 'flag.url_svg', 'flag.description',
  'population', 'region', 'subregion', 'capitals.name', 'tlds', 'currencies.name',
  'languages.name', 'borders', 'codes.alpha_3',
].join(',')

interface ApiCountry {
  names: { common: string; official: string; native?: Record<string, { common: string }> }
  flag: { url_svg: string; description?: string }
  population: number
  region: string
  subregion?: string
  capitals?: Array<{ name: string }>
  tlds?: string[]
  currencies?: Array<{ name: string }>
  languages?: Array<{ name: string }>
  borders?: string[]
  codes: { alpha_3: string }
}

interface ApiResponse { data: { objects: ApiCountry[] } }

function toCountry(country: ApiCountry): Country {
  return {
    name: { common: country.names.common, official: country.names.official, nativeName: country.names.native },
    flags: { svg: country.flag.url_svg, alt: country.flag.description },
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    capital: country.capitals?.map((capital) => capital.name),
    cca3: country.codes.alpha_3,
    tld: country.tlds,
    currencies: country.currencies?.reduce<Record<string, { name: string }>>((all, currency, index) => ({ ...all, [String(index)]: { name: currency.name } }), {}),
    languages: country.languages?.reduce<Record<string, string>>((all, language, index) => ({ ...all, [String(index)]: language.name }), {}),
    borders: country.borders,
  }
}

async function request(path: string, signal?: AbortSignal): Promise<Country[]> {
  const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY
  if (!apiKey) throw new Error('Missing VITE_REST_COUNTRIES_API_KEY')

  const response = await fetch(`${API_URL}${path}`, {
    signal,
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!response.ok) throw new Error(`Country request failed: ${response.status}`)
  const body = await response.json() as ApiResponse
  return body.data.objects.map(toCountry)
}

export async function getAllCountries(signal?: AbortSignal): Promise<Country[]> {
  const query = `response_fields=${encodeURIComponent(responseFields)}&limit=100`
  const pages = await Promise.all([0, 100, 200].map((offset) => request(`?${query}&offset=${offset}`, signal)))
  return pages.flat().sort((first, second) => first.name.common.localeCompare(second.name.common))
}

export async function getCountryByCode(code: string, signal?: AbortSignal): Promise<Country> {
  const countries = await request(`/codes.alpha_3/${encodeURIComponent(code)}?response_fields=${encodeURIComponent(responseFields)}`, signal)
  if (!countries[0]) throw new Error(`Country not found: ${code}`)
  return countries[0]
}

export function getCountriesByCode(codes: string[], signal?: AbortSignal) {
  return Promise.all(codes.map((code) => getCountryByCode(code, signal)))
}
