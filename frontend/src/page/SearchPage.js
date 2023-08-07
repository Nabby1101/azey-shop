import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Search from '../components/Other/Search'

export class SearchPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Search />
        <Footer />
      </div>
    )
  }
}

export default SearchPage