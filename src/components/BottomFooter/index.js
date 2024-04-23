import {Component} from 'react'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

class BottomFooter extends Component {
  render() {
    return (
      <div className="FooterBgB">
        <div>
          <FaGoogle />
          &nbsp;&nbsp;
          <FaTwitter />
          &nbsp;&nbsp;
          <FaInstagram />
          &nbsp;&nbsp;
          <FaYoutube />
        </div>

        <p className="contactUs">Contact us</p>
      </div>
    )
  }
}

export default BottomFooter
