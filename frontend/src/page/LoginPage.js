import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Login from '../components/Other/Login'
export class LoginPage extends Component {
  render() {
    return (
      <div id="all" className=''>
        <Header />
        <Login />
        <Footer />
      </div>
    )
  }
}

export default LoginPage