import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import CartContext from './Context/index'

import Account from './components/Account'

import Popular from './components/Popular'

import Search from './components/Search'

import MovieItemDetails from './components/MovieItemDetails'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {userNames: '', userInput: ''}

  updateName = name => {
    this.setState({userNames: name})
  }

  updateUserInput = user => {
    this.setState({userInput: user})
  }

  render() {
    const {userNames, userInput} = this.state

    console.log(userInput)
    return (
      <div>
        <CartContext.Provider
          value={{
            userNames,
            updatingName: this.updateName,
            userInput,
            updateUserInput: this.updateUserInput,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/account" component={Account} />
            <ProtectedRoute exact path="/popular" component={Popular} />
            <ProtectedRoute exact path="/search" component={Search} />
            <ProtectedRoute
              exact
              path="/movies/:id"
              component={MovieItemDetails}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </div>
    )
  }
}

export default App
