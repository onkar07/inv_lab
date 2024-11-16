import React from 'react'
import Card from './Card'
import './Category.css'


function category() {
    return (
        <div>
            <div className="name">
                <p>Physics Laboratory</p>
            </div>

            <div className="add">
                <i class="fa-solid fa-circle-plus">  </i>New Category &nbsp;
                <p>Physics Lab Equipment Category</p>

            </div>

<div className="cardsec">

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
</div>
        </div>
    )
}

export default category
