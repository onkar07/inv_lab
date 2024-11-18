import React from 'react'
import Card from './Card'
import './Category.css'


function category() {
    return (
        <div className='cat' style={{ width: '100%' }}>
            <div className="name">
                <p>Physics Laboratory</p>
            </div>

            <div className="add ">
                <div className="addtxt">
                    <i className="addico fa-solid fa-circle-plus"><p style={{ fontFamily: 'Arial' }}> New Category</p>   </i>
                </div>

                <p className='p' >Physics Lab Equipment Category</p>
            </div>

            <div className=" cardsec col-12 col-sm-6 col-md-4 col-lg-4 ">
                <div className="row">

                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>



        </div>
    )
}

export default category
