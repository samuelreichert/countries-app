export interface CountryName {
  common: string
  official: string
  nativeName?: Record<string, { common: string }>
}

export interface Country {
  name: CountryName
  flags: { svg: string; alt?: string }
  population: number
  region: string
  subregion?: string
  capital?: string[]
  cca3: string
  tld?: string[]
  currencies?: Record<string, { name: string }>
  languages?: Record<string, string>
  borders?: string[]
}
