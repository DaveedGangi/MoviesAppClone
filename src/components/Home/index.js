import {Component} from 'react'

import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import Cookies from 'js-cookie'

import {HiOutlineSearch} from 'react-icons/hi'

import Loader from 'react-loader-spinner'

import BottomFooter from '../BottomFooter'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
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
        slidesToShow: 3,
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
    } else {
      this.setState({trendingDataStatus: trendingStatus.failure})
    }
  }

  renderHomePosterMovieItems = async () => {
    this.setState({
      homePosterDataStatus: homeRandomPosterStatus.isLoading,
      originalDataStatus: originalMoviesStatus.isLoading,
    })

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

      this.setState({
        storeListOfOriginalMovies: originalMoviesStorage,
        homePosterDataStatus: homeRandomPosterStatus.success,
        originalDataStatus: originalMoviesStatus.success,
      })
    } else {
      this.setState({
        homePosterDataStatus: homeRandomPosterStatus.failure,
        originalDataStatus: originalMoviesStatus.failure,
      })
    }

    const {storeListOfOriginalMovies} = this.state

    const homeMoviePoster = storeListOfOriginalMovies

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
    <div className="homePosterLoader">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  tryAgainForTrendingMovieItems = () => (
    <div>
      <div>
        <img
          src="https://i.ibb.co/9vFb2zC/alert-triangle.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          className="tryAgain"
          onClick={this.renderTrendingNowMovies}
          type="button"
        >
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
              const {id, posterPath, title} = eachLogo

              return (
                <div className="slick-item" key={id}>
                  <Link key={id} to={`movies/${id}`}>
                    <img
                      key={id}
                      className="logo-image"
                      src={posterPath}
                      alt={title}
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
        <img
          src="https://i.ibb.co/9vFb2zC/alert-triangle.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          className="tryAgain"
          onClick={this.renderHomePosterMovieItems}
          type="button"
        >
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
                const {id, posterPath, title} = eachLogo
                return (
                  <div className="slick-item" key={id}>
                    <Link key={id} to={`movies/${id}`}>
                      <img
                        key={id}
                        className="logo-image"
                        src={posterPath}
                        alt={title}
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

  tryAgainForHomeMovieItems = () => (
    <div className="HomeTryAgainBg">
      <div className="HomeTryAgainTab">
        <div>
          <img
            src="https://i.ibb.co/9vFb2zC/alert-triangle.png"
            alt="failure view"
          />
          <p>Something went wrong. Please try again</p>
          <button
            className="tryAgain"
            onClick={this.renderHomePosterMovieItems}
            type="button"
          >
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

    return (
      <div className="basedOnDeviceWidth">
        <div
          key={randomMovieItemPoster.id}
          style={{
            backgroundImage: `url(${randomMovieItemPoster.backDrop})`,
            width: '100%',
            height: '605px',
            top: '135px',
            paddingTop: '1px',
            gap: '0px',
            borderRadius: '0px',
            opacity: '0.8',
            backgroundSize: 'cover',
          }}
        >
          <div className="inPoster">
            <h1 className="titleOnPoster">{randomMovieItemPoster.title}</h1>

            <h1 className="overViewPoster">{randomMovieItemPoster.overView}</h1>

            <div className="randomButton">
              <button className="randomMovieButton" type="button">
                Play
              </button>
            </div>
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
    console.log(homePosterDataStatus)
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="bg-home">
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

        {this.homePosterItems()}

        {this.trendingMovieItems()}

        {this.originalMoviesItems()}

        <BottomFooter />
      </div>
    )
  }
}

export default Home
