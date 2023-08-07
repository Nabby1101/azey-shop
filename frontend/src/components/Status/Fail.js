import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const Fail = () => (
    <div className="">
    <div className="">
	<div className=''>
            <img src="" alt="" />         
          </div>
		</div>
		<div className="">
			<h1><b>OPPS!</b>Fail</h1>
			<p>Uh... So it looks like you looking for something? The page you are looking for has up and Vanished.</p>
			<h2><Link to="/">Trở Về Trang Chủ</Link></h2>
		</div>
	</div>
)
export default Fail