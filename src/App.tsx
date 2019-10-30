import React from 'react'
import Header from './components/Header'
import CountriesList from './components/CountriesList'
import { AppWrapper } from './App.styles'


const App = () => (
  <AppWrapper>
    <Header />
    {/* Form */}
    <CountriesList />
  </AppWrapper>
)

export default App
