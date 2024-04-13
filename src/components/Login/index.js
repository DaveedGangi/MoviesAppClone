import {Component} from 'react'

import Cookies from 'js-cookie'

import CartContext from '../../Context/index'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isTrue: false}

  storeUserName = event => {
    this.setState({username: event.target.value})
  }

  storeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  submitUserData = async event => {
    const {username, password} = this.state
    const userDetails = {username, password}
    event.preventDefault()
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)
    if (response.ok === true) {
      Cookies.set('jwt_token', responseToJson.jwt_token, {expires: 30})
      const {history} = this.props
      this.setState({isTrue: true})
      history.replace('/')
    } else {
      this.setState({
        errorMsg: responseToJson.error_msg,
        username: '',
        password: '',
      })
    }
  }

  render() {
    const {username, password, errorMsg, isTrue} = this.state
    console.log(username)
    console.log(password)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
    return (
      <CartContext.Consumer>
        {value => {
          const {updatingName} = value
          if (isTrue === true) {
            updatingName(username)
          }

          return (
            <div className="bg">
              <div className="movies-heading-login">
                <img
                  className="website-image"
                  src="https://i.ibb.co/sb8t9TB/Screenshot-2024-01-16-132155.png"
                  alt="login website logo"
                />
              </div>

              <div className="bg-flexing-item">
                <form className="card-login" onSubmit={this.submitUserData}>
                  <h1 className="heading-login">Login</h1>
                  <label className="label-username" htmlFor="username">
                    USERNAME
                  </label>
                  <br />
                  <input
                    value={username}
                    onChange={this.storeUserName}
                    className="username"
                    type="text"
                    placeholder="username"
                  />
                  <br />
                  <br />
                  <label className="label-password" htmlFor="password">
                    PASSWORD
                  </label>
                  <br />
                  <input
                    value={password}
                    onChange={this.storeUserPassword}
                    className="password"
                    type="password"
                    placeholder="password"
                  />
                  <br />
                  <p className="errorMsg">{errorMsg}</p>
                  <br />
                  <div>
                    <button className="login-button" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Login