import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import ProductDetail from '../components/Product/ProductDetail'
export class ProductDetailPage extends Component {
  render() {
    return (
        <div id="all" class="">
            <Header />
            <ProductDetail />
            <Footer />
        </div>
    )
  }
}

export default ProductDetailPage