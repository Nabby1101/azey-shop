import React, { Component } from 'react'
import Footer from '../components/Common/Footer'
import Header from '../components/Common/Header'
import News from '../components/Other/News'

export class NewsPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <News />
        <Footer />
      </div>
    )
  }
}

export default NewsPage