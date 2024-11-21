import React from 'react'
import './Card.css'


import ViewAll from '../Equipment/ViewAll'
import { Navigate, useNavigate } from 'react-router-dom'


function Card() {
    const navigate = useNavigate();

    const click = () => {
        navigate('/view')
        // alert("hii")
    }
    return (
        // <div className='card'>
            <div class="card" style={{width: "8rem",cursor:'pointer'}} onClick={click}>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                </div>
            </div>
        // </div>
    )
}

export default Card
