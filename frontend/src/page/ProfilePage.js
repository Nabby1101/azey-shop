import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Profile from '../components/Other/Profile'
export class ProfilePage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Profile />
        <Footer />
      </div>
    )
  }
}

export default ProfilePage