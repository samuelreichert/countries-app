import React, { useState } from 'react'
import { Content, Flag, Link, Text, Title, Wrapper } from './index.styles'

interface Country {
  name: string
  capital: string
  region: string
  population: number
  flag: string
}

const CountriesList = () => {
  const countriesList: Country[] = [
    {
      "name": "Germany",
      "capital": "Berlin",
      "region": "Europe",
      "population": 81770900,
      "flag": "https://restcountries.eu/data/deu.svg",
    },
    {
      "name": "United States of America",
      "capital": "Washington, D.C.",
      "region": "Americas",
      "population": 323947000,
      "flag": "https://restcountries.eu/data/usa.svg",
    },
    {
      "name": "Brazil",
      "capital": "Brasília",
      "region": "Americas",
      "population": 206135893,
      "flag": "https://restcountries.eu/data/bra.svg",
    },
    {
      "name": "Iceland",
      "capital": "Reykjavík",
      "region": "Europe",
      "population": 334300,
      "flag": "https://restcountries.eu/data/isl.svg",
    }
  ]

  const [countries] = useState(countriesList)

  const renderCountry = (country: Country, i: number) => {
    return (
      <Link key={i}>
        <Flag flag={country.flag} />
        <Content>
          <Title>{country.name}</Title>
          <Text><b>Population: </b>{country.population}</Text>
          <Text><b>Region: </b>{country.region}</Text>
          <Text><b>Capital: </b>{country.capital}</Text>
        </Content>
      </Link>
    )
  }

  return (
    <Wrapper>
      { countries.map((country, i) => renderCountry(country, i)) }
    </Wrapper>
  )
}

export default CountriesList
