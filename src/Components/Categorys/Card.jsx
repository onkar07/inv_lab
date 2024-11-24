import React from 'react'
import './Card.css'


import ViewAll from '../Equipment/ViewAll'
import { Navigate, useNavigate } from 'react-router-dom'


function Card({title,description}) {
    const navigate = useNavigate();

    const click = () => {
        navigate('/view')
        // alert("hii")
    }
    return (
        // <div className='card'>
            <div class="card" style={{width: "10rem",height:"20vh",cursor:'pointer'}} onClick={click}>
                <div class="card-body">
                    <h5 class="card-title" style={{fontSize:"15px"}}>{title}</h5><br/>
                    <h6 class="card-subtitle mb-2 text-muted">{description}</h6>
                </div>
            </div>
        // </div>
    )
}

export default Card
