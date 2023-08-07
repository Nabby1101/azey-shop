import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import CheckOut from '../components/Cart/CheckOut'

export class CheckOutPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <CheckOut />
        <Footer />
      </div>
    )
  }
}

export default CheckOutPage