import {Component} from 'react'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

class BottomFooter extends Component {
  render() {
    return (
      <div className="FooterBg">
        <div>
          <FaGoogle />
          &nbsp;&nbsp;
          <FaTwitter />
          &nbsp;&nbsp;
          <FaInstagram />
          &nbsp;&nbsp;
          <FaYoutube />
        </div>
        <p className="contact-us">Contact Us</p>
      </div>
    )
  }
}

export default BottomFooter
