import {Component} from 'react'

import Cookies from 'js-cookie'

import CartContext from '../../Context'

import NavBar from '../NavBar'

import './index.css'

class Search extends Component {
  componentDidMount() {
    this.searchFetch()
  }

  userInput = () => (
    <CartContext.Consumer>
      {value => {
        const {userInput} = value
        return userInput
      }}
    </CartContext.Consumer>
  )

  searchFetch = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const searchText = this.userInput()

    const searchResponse = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`,
      options,
    )

    console.log(searchResponse)
    if (searchResponse.ok === true) {
      const searchResponseJson = await searchResponse.json()
      console.log(searchResponseJson)
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>You can Search Here</h1>
      </div>
    )
  }
}

export default Search
