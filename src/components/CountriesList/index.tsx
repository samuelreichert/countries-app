import React, { useEffect, useState } from 'react'
import formatNumber from '../shared/formatNumber'
import { Content, Flag, Link, Text, Title, Wrapper } from './index.styles'

import { getAllCountries } from '../../api/countries'

interface Country {
  name: string
  capital: string
  region: string
  population: number
  flag: string
}

const CountriesList = () => {
  const [countries, setCountries] = useState([])

  const getCountries = async () => {
    const allCountries = await getAllCountries()
    setCountries(allCountries)
  }

  useEffect(() => {
    getCountries()
  }, [])

  const renderCountry = (country: Country, i: number) => {
    return (
      <Link key={i} to={`/country/${country.name}`}>
        <Flag flag={country.flag} />
        <Content>
          <Title>{country.name}</Title>
          <Text><b>Population: </b>{formatNumber(country.population)}</Text>
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
