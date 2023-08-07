import React, { Component } from 'react'
import Footer from '../components/Common/Footer'
import Header from '../components/Common/Header'
import OrderHistory from '../components/Cart/OrderHistory'

export class OrderHistoryPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <OrderHistory />
        <Footer />
      </div>
    )
  }
}

export default OrderHistoryPage