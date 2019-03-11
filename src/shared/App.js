import React, { Component } from 'react'
import routes from './routes'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'
import Navbar from './Navbar'
import Footer from './footer'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Component {...props} {...rest} />
            )} />
          ))}
          <Route render={(props) => <NoMatch {...props} /> } />
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default App