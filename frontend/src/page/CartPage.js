import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Cart from '../components/Cart/Cart'

export class CartPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Cart />
        <Footer />
      </div>
    )
  }
}

export default CartPage