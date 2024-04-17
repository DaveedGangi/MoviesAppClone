import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class NavBar extends Component {
  render() {
    return (
      <div className="navBarBg">
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
        <div className="navRightSide">
          <div className="navInputElements">
            <label className="nav-input-label" htmlFor="inputTaken">
              <Link to="search">
                <img src="https://i.ibb.co/nRjMJ6c/search.png" alt="search" />
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
  }
}

export default NavBar
