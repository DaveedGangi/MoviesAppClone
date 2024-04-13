import {Component} from 'react'

import Cookies from 'js-cookie'

import CartContext from '../../Context/index'

import NavBar from '../NavBar'

import './index.css'

class Account extends Component {
  removingCookie = () => {
    Cookies.remove('jwt_token')
  }

  render() {
    return (
      <div>
        <CartContext.Consumer>
          {value => {
            const {userNames} = value

            return (
              <div>
                <NavBar />
                <h1>Account</h1>
                <hr />
                <div>
                  <h1>Member ship</h1>
                  <h1>{userNames}@gmail.com</h1>
                  <p>Password: * * * * * * * * *</p>
                </div>
                <hr />
                <p>
                  Plan details <span>Premium Ultra HD</span>
                </p>
                <hr />
                <div>
                  <button onClick={this.removingCookie} type="button">
                    Logout
                  </button>
                </div>
              </div>
            )
          }}
        </CartContext.Consumer>
      </div>
    )
  }
}

export default Account
