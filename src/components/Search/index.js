import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import BottomFooter from '../BottomFooter'

import './index.css'

const searchedStatus = {
  initial: 'INITIAL',
  isLoading: 'LOADER',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Search extends Component {
  state = {
    userInputs: '',
    searchedDataStatus: searchedStatus.initial,
    storageForSearchedMovies: [],
  }

  componentDidMount() {
    this.searchFetch()
  }

  searchFetch = async () => {
    this.setState({searchedDataStatus: searchedStatus.initial})
    const {userInputs} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const searchText = userInputs

    const searchResponse = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`,
      options,
    )

    console.log(searchResponse)
    const searchResponseJson = await searchResponse.json()
    console.log(searchResponseJson)
    if (searchResponse.ok === true) {
      const searchStorageMovies = searchResponseJson.results.map(
        searchMovie => ({
          id: searchMovie.id,
          backDropSearchMovie: searchMovie.backdrop_path,
          searchMoviePoster: searchMovie.poster_path,
          title: searchMovie.title,
        }),
      )

      this.setState({
        storageForSearchedMovies: searchStorageMovies,
        searchedDataStatus: searchedStatus.success,
      })
    }
    if (searchResponseJson.results.length === 0) {
      this.setState({searchedDataStatus: searchedStatus.failure})
    }
  }

  changeUserInput = event => {
    this.setState({userInputs: event.target.value})
  }

  loaderForSearchedMovies = () => (
    <div>
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  failureForSearchedMovies = () => {
    const {userInputs} = this.state

    return (
      <div className="bgTextUnknown">
        <div className="bgForWrongUserText">
          <img src="https://i.ibb.co/qrPMDDV/Group-7394.png" alt="not-found" />
          <p>Your search for {userInputs} did not find any matches.</p>
        </div>
      </div>
    )
  }

  successForSearchedMovies = () => {
    const {storageForSearchedMovies} = this.state

    return (
      <div className="searchedMoviesBg">
        {storageForSearchedMovies.map(eachSearchedMovies => (
          <div key={eachSearchedMovies.id}>
            <Link to={`movies/${eachSearchedMovies.id}`}>
              <img
                className="searchedMovieImages"
                src={eachSearchedMovies.backDropSearchMovie}
                alt={eachSearchedMovies.title}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  }

  searchedMoviesText = () => {
    const {searchedDataStatus} = this.state

    switch (searchedDataStatus) {
      case searchedStatus.isLoading:
        return this.loaderForSearchedMovies()
      case searchedStatus.failure:
        return this.failureForSearchedMovies()
      case searchedStatus.success:
        return this.successForSearchedMovies()
      default:
        return null
    }
  }

  render() {
    const {userInputs} = this.state
    return (
      <div>
        <div className="navBarBgs">
          <div className="navLeftSide">
            <Link to="/" className="webSiteImageNav">
              <img
                className="website-image"
                src="https://i.ibb.co/xDLJrF3/Group-7399.png"
                alt="login website logo"
              />
            </Link>
            <div className="HomeAndPopular">
              <h3>
                <Link className="home-link" to="/">
                  Home
                </Link>
              </h3>
              <h3>
                <Link className="popular-link" to="/popular">
                  Popular
                </Link>
              </h3>
            </div>
          </div>
          <div className="navRightSides">
            <div className="navInputElements">
              <input
                value={userInputs}
                onChange={this.changeUserInput}
                className="navInput"
                type="search"
                id="inputTaken"
              />
              <label className="nav-input-label" htmlFor="inputTaken">
                <img
                  onClick={this.searchFetch}
                  src="https://i.ibb.co/nRjMJ6c/search.png"
                  alt="search"
                />
              </label>
            </div>

            <div>
              <Link to="/account">
                <img
                  className="avatar"
                  src="https://i.ibb.co/V3NCT28/Avatar.png"
                  alt="avatarImage"
                />
              </Link>
            </div>
          </div>
        </div>

        {this.searchedMoviesText()}

        <BottomFooter />
      </div>
    )
  }
}

export default Search
