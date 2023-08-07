import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Category from '../components/Product/Category'

export class CategoryPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <div id="news" className="second" style={{paddingTop: '20px'}}>		
            <div className="articleList">
            <h1 className="title enFont">
                {/*Light is so beautiful*/}
                <div className="bar">
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                  <div className="cut" />
                </div>
                <div>Category</div>
            </h1>
              <div className='ichiran flex commonPadding'>
                <Category />
              </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default CategoryPage