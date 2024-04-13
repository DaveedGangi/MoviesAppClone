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
              src="https://i.ibb.co/sb8t9TB/Screenshot-2024-01-16-132155.png"
              alt="login website logo"
            />
          </Link>
          <div className="HomeAndPopular">
            <h3>
              <Link to="/">Home</Link>
            </h3>
            <h3>
              <Link to="/popular">Popular</Link>
            </h3>
          </div>
        </div>
        <div className="navRightSide">
          <Link to="/search" className="navInputElements">
            <input className="navInput" type="text" id="inputTaken" />
            <label className="nav-input-label" htmlFor="inputTaken">
              <img src="https://i.ibb.co/JkjNp5B/search.png" alt="search" />
            </label>
          </Link>
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
