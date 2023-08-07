import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Order from '../components/Cart/Order'

export class OrderPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Order />
        <Footer />
      </div>
    )
  }
}

export default OrderPage