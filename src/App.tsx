import React from 'react'
import Header from './components/Header'
import CountriesList from './components/CountriesList'
import CountryDetails from './components/CountryDetails'
import { AppWrapper } from './App.styles'
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'

const App = () => (
  <Router>
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path='/' component={CountriesList} />
        <Route path='/country/:name' component={CountryDetails} />
      </Switch>

    </AppWrapper>
  </Router>
)

export default App
