import axios from 'axios'

const BASE_URL: string = 'https://restcountries.eu/rest/v2/'

export const getAllCountries = async () => {
  const url: string = `${BASE_URL}all?fields=name;flag;population;region;capital`
  const { data: countries } = await axios.get(url)

  return countries
}

export const getCountryDetails = async (name: string) => {
  const url: string = `${BASE_URL}name/${name}?fullText=true`
  const { data } = await axios.get(url)
  const country = data[0]

  return country
}
