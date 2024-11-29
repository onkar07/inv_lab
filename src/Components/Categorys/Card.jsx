import React, { useState } from 'react'
import './Card.css'


import ViewAll from '../Equipment/ViewAll'
import { Navigate, useNavigate } from 'react-router-dom'


function Card({ title, id }) {
    const navigate = useNavigate();
    
    return (
        // <div className='card'>
        <div className="card" style={{ width: "10rem", height: "20vh", cursor: 'pointer' }}>
            <div className="card-body">
                {/* style={{fontsize: "15px",    textalign: "center", paddingtop: "20px"}}  */}
                <h5 className="card-title" style={{ fontSize: "15px" }}>{title}</h5><br />
                {/* <h6 className="card-subtitle mb-2 text-muted">{body}</h6> */}
            </div>
        </div>
        // </div>
    )
}

export default Card
