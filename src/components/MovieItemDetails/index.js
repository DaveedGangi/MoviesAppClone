import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {format} from 'date-fns'

import {Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import BottomFooter from '../BottomFooter'

import './index.css'

const movieItemData = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  isLoading: 'LOADER',
}

class MovieItemDetails extends Component {
  state = {movieItemStatus: movieItemData.initial, movieItemDataStorage: []}

  componentDidMount() {
    this.movieItemFetch()
  }

  movieItemFetch = async () => {
    this.setState({movieItemStatus: movieItemData.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieId = id
    const api = `https://apis.ccbp.in/movies-app/movies/${movieId}`
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
      const responseToJsonMovieItem = await response.json()
      console.log(responseToJsonMovieItem)
      const dataOfMovieStore = {
        id: responseToJsonMovieItem.movie_details.id,
        adult: responseToJsonMovieItem.movie_details.adult,
        backDropMovie: responseToJsonMovieItem.movie_details.backdrop_path,
        budget: responseToJsonMovieItem.movie_details.budget,
        overview: responseToJsonMovieItem.movie_details.overview,
        posterMovie: responseToJsonMovieItem.movie_details.poster_path,
        releaseDataMovie: responseToJsonMovieItem.movie_details.release_date,
        runtime: responseToJsonMovieItem.movie_details.runtime,
        title: responseToJsonMovieItem.movie_details.title,
        voteAverage: responseToJsonMovieItem.movie_details.vote_average,
        voteCount: responseToJsonMovieItem.movie_details.vote_count,

        spokenLanguages: responseToJsonMovieItem.movie_details.spoken_languages.map(
          eachLang => ({
            id: eachLang.id,
            englishNames: eachLang.english_name,
          }),
        ),
        similarMovies: responseToJsonMovieItem.movie_details.similar_movies.map(
          eachItem => ({
            id: eachItem.id,
            backDropSimilarItem: eachItem.backdrop_path,
            posterForSimilarItem: eachItem.poster_path,
            titleForSimilar: eachItem.title,
          }),
        ),
        geners: responseToJsonMovieItem.movie_details.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
      }
      console.log(dataOfMovieStore)
      this.setState({
        movieItemDataStorage: dataOfMovieStore,
        movieItemStatus: movieItemData.success,
      })
    } else {
      this.setState({movieItemStatus: movieItemData.failure})
    }
  }

  movieItemLoading = () => (
    <div className="loaderForMovieDetail">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  movieItemSuccess = () => {
    const {movieItemDataStorage} = this.state

    const date = new Date(movieItemDataStorage.releaseDataMovie)
    const formatDate = format(date, 'do MMMM yyyy')
    return (
      <div className="backMovieBg">
        <div
          style={{
            backgroundImage: `url(${movieItemDataStorage.backDropMovie})`,
            width: '100vw',
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
            <div className="navBarBgD">
              <div className="navLeftSide">
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
              </div>
              <div className="navRightSide">
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
              </div>
            </div>
          </div>

          <div className="inPoster">
            <h1 className="titleOnPoster">{movieItemDataStorage.title}</h1>
            <div className="flexTimingAndOtherDetails">
              <p className="timeOnPoster">
                {Math.floor(movieItemDataStorage.runtime / 60)}h{' '}
                {movieItemDataStorage.runtime % 60}m
              </p>

              {movieItemDataStorage.adult === true ? (
                <p>A</p>
              ) : (
                <p className="UA">U/A</p>
              )}

              <p className="year">
                {new Date(movieItemDataStorage.releaseDataMovie).getFullYear()}
              </p>
            </div>
            <p className="overViewPoster">{movieItemDataStorage.overview}</p>
            <button className="randomMovieButton" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="flexGenerBg">
          <div>
            <ul className="flexGenreAndOtherData">
              <li className="listForSingleGenre">
                <h1 className="styleParaForDetails">genres</h1>
                {movieItemDataStorage.geners.map(each => (
                  <p key={each.id}>{each.name}</p>
                ))}
              </li>

              <li className="listForSingleGenre">
                <h1 className="styleParaForDetails">Audio Available</h1>
                {movieItemDataStorage.spokenLanguages.map(eachLan => (
                  <div key={eachLan.id}>
                    <p>{eachLan.englishNames}</p>
                  </div>
                ))}
              </li>
              <li className="listForSingleGenre">
                <h1 className="styleParaForDetails">Rating Count</h1>
                <p>{movieItemDataStorage.voteCount}</p>
                <h1 className="styleParaForDetails">Rating Average</h1>
                <p>{movieItemDataStorage.voteAverage}</p>
              </li>
              <li className="listForSingleGenre">
                <h1 className="styleParaForDetails">Budget</h1>
                <p>{movieItemDataStorage.budget}</p>
                <h1 className="styleParaForDetails">Release Date</h1>

                <p>{formatDate}</p>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="more-like">More like this</h1>
            <ul className="flexSimilarMovies">
              {movieItemDataStorage.similarMovies.map(eachM => (
                <li key={eachM.id}>
                  <img
                    key={eachM.id}
                    className="similarMovie"
                    src={eachM.posterForSimilarItem}
                    alt={eachM.titleForSimilar}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  movieItemFailure = () => (
    <div>
      <div>
        <img
          src="https://i.ibb.co/9vFb2zC/alert-triangle.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button onClick={this.movieItemFetch} type="button">
          Try Again
        </button>
      </div>
    </div>
  )

  renderMovieItemDetails = () => {
    const {movieItemStatus} = this.state

    switch (movieItemStatus) {
      case movieItemData.isLoading:
        return this.movieItemLoading()
      case movieItemData.failure:
        return this.movieItemFailure()
      case movieItemData.success:
        return this.movieItemSuccess()
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
      <div className="backMovieBg">
        {this.renderMovieItemDetails()}
        <br />
        <div>
          <BottomFooter />
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
