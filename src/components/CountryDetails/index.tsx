import React, { useEffect, useState } from 'react'
import { getCountryDetails } from '../../api/countries'
import { Button } from './index.styles'

const CountryDetails = (props: any) => {
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
      <Button onClick={goBack}>
        <i className="fas fa-arrow-left" />
        Back
      </Button>

      {/* <ContentWrapper>
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
      </ContentWrapper> */}
      Hello world
    </div>
  )
}

export default CountryDetails
