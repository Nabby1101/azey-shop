import React from 'react'
import './style.scss'

const MessageBox = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}
            style={{ backgroundColor: 'rgba(255, 199, 253, 0.7)', color: 'red' }}
        >
            {props.children}
        </div>
    )
}
export default MessageBox
