import {Component} from 'react'

import {Link} from 'react-router-dom'

import CartContext from '../../Context'

import './index.css'

class NavBar extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {userInput, updateUserInput} = value

          const changeUserInput = event => {
            updateUserInput(event.target.value)
          }
          return (
            <div className="navBarBg">
              <div className="navLeftSide">
                <Link to="/" className="webSiteImageNav">
                  <img
                    className="website-image"
                    src="https://i.ibb.co/sb8t9TB/Screenshot-2024-01-16-132155.png"
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
              <div className="navRightSide">
                <div className="navInputElements">
                  <input
                    value={userInput}
                    onChange={changeUserInput}
                    className="navInput"
                    type="text"
                    id="inputTaken"
                  />
                  <label className="nav-input-label" htmlFor="inputTaken">
                    <Link to="search">
                      <img
                        src="https://i.ibb.co/JkjNp5B/search.png"
                        alt="search"
                      />
                    </Link>
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
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default NavBar
