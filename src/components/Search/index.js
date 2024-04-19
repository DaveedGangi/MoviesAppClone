import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {HiOutlineSearch} from 'react-icons/hi'

import Pagination from '../Pagination'

import BottomFooter from '../BottomFooter'

import './index.css'

const searchedStatus = {
  initial: 'INITIAL',
  isLoading: 'LOADER',
  failure: 'FAILURE',
  success: 'SUCCESS',
  isNoMovies: 'NOMOVIES',
}

class Search extends Component {
  state = {
    userInputs: '',
    searchedDataStatus: searchedStatus.initial,
    storageForSearchedMovies: [],
    duplicateForSearchDMovies: [],
    pageNumber: 1,
  }

  componentDidMount() {
    this.searchFetch()
  }

  searchFetch = async () => {
    this.setState({searchedDataStatus: searchedStatus.isLoading})
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
      if (searchResponseJson.results.length === 0) {
        this.setState({searchedDataStatus: searchedStatus.isNoMovies})
      } else {
        this.setState({
          storageForSearchedMovies: searchStorageMovies,
          duplicateForSearchDMovies: searchStorageMovies.slice(0, 10),
          searchedDataStatus: searchedStatus.success,
        })
      }
    } else {
      this.setState({searchedDataStatus: searchedStatus.failure})
    }
  }

  changeUserInput = event => {
    this.setState({userInputs: event.target.value})
  }

  loaderForSearchedMovies = () => (
    <div className="loaderForSearch">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  noMoviesFound = () => {
    const {userInputs} = this.state

    return (
      <div className="bgTextUnknown">
        <div className="bgForWrongUserText">
          <img
            className="NoMovies"
            testid="no movies"
            src="https://i.ibb.co/qrPMDDV/Group-7394.png"
            alt="no movies"
          />
          <p>Your search for {userInputs} did not find any matches.</p>
        </div>
      </div>
    )
  }

  successForSearchedMovies = () => {
    const {duplicateForSearchDMovies} = this.state

    return (
      <ul className="searchedMoviesBg">
        {duplicateForSearchDMovies.map(eachSearchedMovies => (
          <li key={eachSearchedMovies.id}>
            <Link to={`movies/${eachSearchedMovies.id}`}>
              <img
                key={eachSearchedMovies.id}
                className="searchedMovieImages"
                src={eachSearchedMovies.searchMoviePoster}
                alt={eachSearchedMovies.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  failureForSearchedMovies = () => (
    <div>
      <img
        src="https://i.ibb.co/TYdGbZK/Background-Complete.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.fetchPopularMovies} type="button">
        Try Again
      </button>
    </div>
  )

  searchedMoviesText = () => {
    const {searchedDataStatus} = this.state

    switch (searchedDataStatus) {
      case searchedStatus.isLoading:
        return this.loaderForSearchedMovies()
      case searchedStatus.isNoMovies:
        return this.noMoviesFound()
      case searchedStatus.failure:
        return this.failureForSearchedMovies()
      case searchedStatus.success:
        return this.successForSearchedMovies()
      default:
        return null
    }
  }

  changePageNumber = pageNumberData => {
    const {storageForSearchedMovies} = this.state
    this.setState({
      duplicateForSearchDMovies: storageForSearchedMovies.slice(
        pageNumberData * 10 - 10,
        pageNumberData * 10,
      ),
    })
  }

  changePagesData = pageNumbers => {
    this.setState({pageNumber: pageNumbers}, this.fetchingApiAgain)
  }

  fetchingApiAgain = () => {
    this.successForSearchedMovies()
  }

  render() {
    const {userInputs, pageNumber, storageForSearchedMovies} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    return (
      <div className="BGsearch">
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
                <button
                  className="searchButton"
                  testid="searchButton"
                  type="button"
                  onClick={this.searchFetch}
                >
                  <HiOutlineSearch />
                </button>
              </label>
            </div>

            <div>
              <Link to="/account">
                <img
                  className="avatar"
                  src="https://i.ibb.co/V3NCT28/Avatar.png"
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        </div>
        {this.searchedMoviesText()}

        <Pagination
          data={storageForSearchedMovies}
          pageNumber={pageNumber}
          changePageNumber={this.changePageNumber}
          changePagesData={this.changePagesData}
        />

        <BottomFooter />
      </div>
    )
  }
}

export default Search
