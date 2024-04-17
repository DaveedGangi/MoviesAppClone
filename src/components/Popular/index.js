import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FiAlertTriangle} from 'react-icons/fi'

import NavBar from '../NavBar'

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
    <div className="main-container">
      <div className="slick-container">
        <div className="main-container-for-spinners">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </div>
  )

  failureForPopularMovie = () => (
    <div>
      <div>
        <FiAlertTriangle />
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
        <div className="popularMoviesBg">
          {popularMovieDataStorage.map(eachPopularMovie => (
            <div key={eachPopularMovie.id}>
              <Link to={`movies/${eachPopularMovie.id}`}>
                <img
                  className="popularMovieImages"
                  src={eachPopularMovie.backDropForPopular}
                  alt={eachPopularMovie.title}
                />
              </Link>
            </div>
          ))}
        </div>
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
      <div>
        <NavBar />
        {this.popularMovieItems()}

        <br />

        <BottomFooter />
      </div>
    )
  }
}

export default Popular
