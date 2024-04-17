import {Component} from 'react'

import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FiAlertTriangle} from 'react-icons/fi'

import NavBar from '../NavBar'

import BottomFooter from '../BottomFooter'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const trendingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

const originalMoviesStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

const homeRandomPosterStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class Home extends Component {
  state = {
    storeListOfTrendingMovies: [],
    storeListOfOriginalMovies: [],
    trendingDataStatus: trendingStatus.initial,
    originalDataStatus: originalMoviesStatus.initial,
    homePosterDataStatus: homeRandomPosterStatus.initial,
    randomMovieItemPoster: '',
  }

  componentDidMount() {
    this.renderHomeOriginalMovieItems()
    this.renderTrendingNowMovies()
    this.renderHomePosterMovieItems()
  }

  renderTrendingNowMovies = async () => {
    this.setState({trendingDataStatus: trendingStatus.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseTrending = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )
    console.log(responseTrending.ok)
    if (responseTrending.ok === true) {
      const responseTrendingJson = await responseTrending.json()
      console.log('Trending')
      console.log(responseTrendingJson)
      const trendingStorage = responseTrendingJson.results.map(each => ({
        id: each.id,
        backDrop: each.backdrop_path,
        overView: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(trendingStorage)
      this.setState({
        storeListOfTrendingMovies: trendingStorage,
        trendingDataStatus: trendingStatus.success,
      })
    }
  }

  renderHomeOriginalMovieItems = async () => {
    this.setState({originalDataStatus: originalMoviesStatus.isLoading})
    const api = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(api, options)
    console.log(response)
    if (response.ok === true) {
      const responseOriginalsJson = await response.json()
      console.log('Originals')
      console.log(responseOriginalsJson)
      const originalMoviesStorage = responseOriginalsJson.results.map(each => ({
        id: each.id,
        backDrop: each.backdrop_path,
        overView: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(originalMoviesStorage)
      this.setState({
        storeListOfOriginalMovies: originalMoviesStorage,
        originalDataStatus: originalMoviesStatus.success,
      })
    }
  }

  loaderForTrendingMovieItems = () => (
    <div className="main-container">
      <div className="slick-container">
        <h1 className="trending-heading">Trending Now</h1>
        <div className="main-container-for-spinners">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </div>
  )

  loaderForOriginalMovieItems = () => (
    <div className="main-container">
      <div className="slick-container">
        <h1 className="originals-heading">Originals</h1>
        <div className="main-container-for-spinners">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </div>
  )

  loaderForHomePosterMovieItems = () => (
    <div>
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  tryAgainForTrendingMovieItems = () => (
    <div>
      <div>
        <FiAlertTriangle />
        <p>Something went wrong. Please try again</p>
        <button onClick={this.renderTrendingNowMovies} type="button">
          Try Again
        </button>
      </div>
    </div>
  )

  successForTrendingMovieItems = () => {
    const {storeListOfTrendingMovies} = this.state

    return (
      <div className="main-container">
        <div className="slick-container">
          <h1 className="trending-heading">Trending Now</h1>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <Slider {...settings}>
            {storeListOfTrendingMovies.map(eachLogo => {
              const {id, posterPath} = eachLogo
              return (
                <div className="slick-item" key={id}>
                  <Link to={`movies/${id}`}>
                    <img
                      className="logo-image"
                      src={posterPath}
                      alt="company logo"
                    />
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    )
  }

  trendingMovieItems = () => {
    const {trendingDataStatus} = this.state

    switch (trendingDataStatus) {
      case trendingStatus.isLoading:
        return this.loaderForTrendingMovieItems()
      case trendingStatus.failure:
        return this.tryAgainForTrendingMovieItems()
      case trendingStatus.success:
        return this.successForTrendingMovieItems()
      default:
        return null
    }
  }

  tryAgainForOriginalMovieItems = () => (
    <div>
      <div>
        <FiAlertTriangle />
        <p>Something went wrong. Please try again</p>
        <button onClick={this.renderHomeOriginalMovieItems} type="button">
          Try Again
        </button>
      </div>
    </div>
  )

  successForOriginalMovieItems = () => {
    const {storeListOfOriginalMovies} = this.state

    return (
      <div className="OriginalMovies">
        <div className="main-container">
          <div className="slick-container">
            <h1 className="originals-heading">Originals</h1>
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <Slider {...settings}>
              {storeListOfOriginalMovies.map(eachLogo => {
                const {id, posterPath} = eachLogo
                return (
                  <div className="slick-item" key={id}>
                    <Link to={`movies/${id}`}>
                      <img
                        className="logo-image"
                        src={posterPath}
                        alt="company logo"
                      />
                    </Link>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    )
  }

  renderHomePosterMovieItems = () => {
    const {storeListOfTrendingMovies, storeListOfOriginalMovies} = this.state
    this.setState({homePosterDataStatus: homeRandomPosterStatus.isLoading})
    const homeMoviePoster = [
      ...storeListOfTrendingMovies,
      ...storeListOfOriginalMovies,
    ]

    const randomMovie =
      homeMoviePoster[Math.ceil(Math.random() * homeMoviePoster.length)]

    if (randomMovie === undefined) {
      this.setState({
        homePosterDataStatus: homeRandomPosterStatus.failure,
        randomMovieItemPoster: '',
      })
    } else if (homeMoviePoster.length === 0) {
      this.setState({
        homePosterDataStatus: homeRandomPosterStatus.failure,
        randomMovieItemPoster: '',
      })
    } else {
      this.setState({
        randomMovieItemPoster: randomMovie,
        homePosterDataStatus: homeRandomPosterStatus.success,
      })
    }
  }

  tryAgainForHomeMovieItems = () => (
    <div className="HomeTryAgainBg">
      <div className="HomeTryAgainTab">
        <div>
          <FiAlertTriangle />
          <p>Something went wrong. Please try again</p>
          <button onClick={this.renderHomePosterMovieItems} type="button">
            Try Again
          </button>
        </div>
      </div>
    </div>
  )

  successForHomeMovieItems = () => {
    const {randomMovieItemPoster} = this.state
    console.log('belowRandomHooray')
    console.log(randomMovieItemPoster)
    console.log(randomMovieItemPoster.backDrop)

    return (
      <div
        style={{
          backgroundImage: `url(${randomMovieItemPoster.backDrop})`,
          width: '100%',
          height: '605px',
          top: '135px',
          left: '166px',
          gap: '0px',
          borderRadius: '0px',
          opacity: '0.8',
          backgroundSize: 'cover',
        }}
      >
        <div>
          <NavBar />
        </div>
        <div className="bg-poster-items">
          <h1 className="random-movie-title">{randomMovieItemPoster.title}</h1>

          <p className="random-movie-overview">
            {randomMovieItemPoster.overView}
          </p>
          <div className="random-button">
            <button className="random-movie-button" type="button">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  originalMoviesItems = () => {
    const {originalDataStatus} = this.state

    switch (originalDataStatus) {
      case originalMoviesStatus.isLoading:
        return this.loaderForOriginalMovieItems()
      case originalMoviesStatus.failure:
        return this.tryAgainForOriginalMovieItems()
      case originalMoviesStatus.success:
        return this.successForOriginalMovieItems()
      default:
        return null
    }
  }

  homePosterItems = () => {
    const {homePosterDataStatus} = this.state

    switch (homePosterDataStatus) {
      case homeRandomPosterStatus.isLoading:
        return this.loaderForHomePosterMovieItems()
      case homeRandomPosterStatus.failure:
        return this.tryAgainForHomeMovieItems()
      case homeRandomPosterStatus.success:
        return this.successForHomeMovieItems()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {homePosterDataStatus} = this.state
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="bg-home">
        {homePosterDataStatus !== 'SUCCESS' && <NavBar />}
        {this.homePosterItems()}

        {this.trendingMovieItems()}

        {this.originalMoviesItems()}

        <div>
          <BottomFooter />
        </div>
      </div>
    )
  }
}

export default Home
