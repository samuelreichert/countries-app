import React, { useEffect, useState } from 'react'
import { getCountryDetails } from '../../api/countries'

const CountryDetails = (props: any) => {
  console.log(props)
  const { history: { goBack }, match: { params: { name } } } : { history: any, match: any } = props
  const [country, setCountry] = useState({})

  const getCountry = async () => {
    const countryDetails: object = await getCountryDetails(name)
    setCountry(countryDetails)
  }

  useEffect(() => {
    getCountry()
  })

  return (
    <div>
      {/* setinha */}
      <Button onClick={goBack}>Back</Button>

      <ContentWrapper>
        <Flag></Flag>

        <CountryContent>
          <Name></Name>

          <InfoPanel>
            <Info>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </Info>
            <Info>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </Info>
          </InfoPanel>

          <BorderCountries>
            <Text></Text>
            <Button small></Button>
          </BorderCountries>
        </CountryContent>
      </ContentWrapper>
      Hello world
    </div>
  )
}

export default CountryDetails
