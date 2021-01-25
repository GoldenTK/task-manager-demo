import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import { CssBaseline } from '@material-ui/core'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

theme.spacing(2)

const redirectToHome = () =>
  <Redirect to="/" />

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*" render={redirectToHome} />
          </Switch>
        </Router>
    </ThemeProvider>
  )
}

export default App
