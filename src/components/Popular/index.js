import {Component} from 'react'

import {Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import BottomFooter from '../BottomFooter'

import './index.css'

const popularStatus = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  isLoading: 'LOADING',
  success: 'SUCCESS',
}

class Popular extends Component {
  state = {
    popularDataStatus: popularStatus.initial,
    popularMovieDataStorage: [],
  }

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    this.setState({popularDataStatus: popularStatus.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const popularResponse = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )

    console.log(popularResponse)
    if (popularResponse.ok === true) {
      const popularResponseToJson = await popularResponse.json()
      console.log(popularResponseToJson)

      const popularMoviesStore = popularResponseToJson.results.map(
        eachPopular => ({
          id: eachPopular.id,
          backDropForPopular: eachPopular.backdrop_path,
          posterForPopular: eachPopular.poster_path,
          title: eachPopular.title,
        }),
      )
      console.log(popularMoviesStore)

      this.setState({
        popularMovieDataStorage: popularMoviesStore,
        popularDataStatus: popularStatus.success,
      })
    } else {
      this.setState({popularDataStatus: popularStatus.failure})
    }
  }

  loaderForPopularMovie = () => (
    <div className="loaderForPopular">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  failureForPopularMovie = () => (
    <div>
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
    </div>
  )

  successForPopularMovie = () => {
    const {popularMovieDataStorage} = this.state
    return (
      <div>
        <ul className="popularMoviesBg">
          {popularMovieDataStorage.map(eachPopularMovie => (
            <li>
              <Link to={`movies/${eachPopularMovie.id}`}>
                <img
                  key={eachPopularMovie.id}
                  className="popularMovieImages"
                  src={eachPopularMovie.posterForPopular}
                  alt={eachPopularMovie.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  popularMovieItems = () => {
    const {popularDataStatus} = this.state

    switch (popularDataStatus) {
      case popularStatus.isLoading:
        return this.loaderForPopularMovie()
      case popularStatus.failure:
        return this.failureForPopularMovie()
      case popularStatus.success:
        return this.successForPopularMovie()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    return (
      <div className="popularBg">
        <ul className="navBarBgp">
          <li className="navLeftSide">
            <Link to="/" className="webSiteImageNav">
              <img
                className="website-image"
                src="https://i.ibb.co/xDLJrF3/Group-7399.png"
                alt="website logo"
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
          </li>
          <li className="navRightSide">
            <div className="navInputElements">
              <label className="nav-input-label" htmlFor="inputTaken">
                <Link to="/search">
                  <button
                    className="searchButton"
                    testid="searchButton"
                    type="button"
                  >
                    <HiOutlineSearch />
                  </button>
                </Link>
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
          </li>
        </ul>

        {this.popularMovieItems()}

        <br />

        <BottomFooter />
      </div>
    )
  }
}

export default Popular
