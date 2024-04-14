import {Component} from 'react'

import Slider from 'react-slick'

import Cookies from 'js-cookie'

import NavBar from '../NavBar'

import BottomFooter from '../BottomFooter'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: true,
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

class Home extends Component {
  state = {storeListOfTrendingMovies: [], storeListOfOriginalMovies: []}

  componentDidMount() {
    this.renderHomeOriginalImages()
    this.renderTrendingNowMovies()
  }

  renderTrendingNowMovies = async () => {
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
      this.setState({storeListOfTrendingMovies: trendingStorage})
    }
  }

  renderHomeOriginalImages = async () => {
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
      this.setState({storeListOfOriginalMovies: originalMoviesStorage})
    }
  }

  render() {
    const {storeListOfTrendingMovies, storeListOfOriginalMovies} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    return (
      <div className="bg-home">
        <div>
          <NavBar />
        </div>
        <h1>Hi Iam Home</h1>

        <div className="main-container">
          <div className="slick-container">
            <h1 className="trending-heading">Trending Now</h1>
            <link
              rel="stylesheet"
              type="text/css"
              charset="UTF-8"
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
                    <img
                      className="logo-image"
                      src={posterPath}
                      alt="company logo"
                    />
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>

        <div className="OriginalMovies">
          <div className="main-container">
            <div className="slick-container">
              <h1 className="originals-heading">Originals</h1>
              <link
                rel="stylesheet"
                type="text/css"
                charset="UTF-8"
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
                      <img
                        className="logo-image"
                        src={posterPath}
                        alt="company logo"
                      />
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>

        <div>
          <BottomFooter />
        </div>
      </div>
    )
  }
}

export default Home
