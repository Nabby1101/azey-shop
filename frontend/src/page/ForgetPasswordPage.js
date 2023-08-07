import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import ForgetPassword from '../components/Other/ForgetPassword'
export class ForgetPasswordPage extends Component {
  render() {
    return (
      <div id="all" className=''>
        <Header />
        <ForgetPassword />
        <Footer />
      </div>
    )
  }
}

export default ForgetPasswordPage