import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import CartContext from './Context/index'

import Account from './components/Account'

import Popular from './components/Popular'

import Search from './components/Search'

import './App.css'

class App extends Component {
  state = {userNames: ''}

  updateName = name => {
    this.setState({userNames: name})
  }

  render() {
    const {userNames} = this.state
    return (
      <div>
        <CartContext.Provider
          value={{userNames, updatingName: this.updateName}}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </CartContext.Provider>
      </div>
    )
  }
}

export default App
