import {Component} from 'react'

import Cookies from 'js-cookie'

import CartContext from '../../Context/index'

import NavBar from '../NavBar'

import BottomFooter from '../BottomFooter'

import './index.css'

class Account extends Component {
  removingCookie = () => {
    const {history} = this.props
    history.replace('/login')
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
                <div className="accountBg">
                  <div className="accountContent">
                    <h1>Account</h1>
                    <hr />
                    <div>
                      <p>Member ship</p>
                      <h1>{userNames}@gmail.com</h1>
                      <p>Password: * * * * * * * * *</p>
                    </div>
                    <hr />
                    <p>
                      Plan details Premium &nbsp; &nbsp;
                      <span style={{border: '1px solid black'}}>
                        {' '}
                        <p>Ultra HD</p>
                      </span>
                    </p>
                    <hr />
                    <div>
                      <button
                        className="logOutButton"
                        onClick={this.removingCookie}
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <BottomFooter />
              </div>
            )
          }}
        </CartContext.Consumer>
      </div>
    )
  }
}

export default Account
