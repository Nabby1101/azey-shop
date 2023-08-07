import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Product from '../components/Product/Product'
import Category from '../components/Product/Category'

export class ProductPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Product />
        <Footer />
      </div>
    )
  }
}

export default ProductPage