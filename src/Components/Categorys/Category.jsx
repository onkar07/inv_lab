import React, { useState } from 'react'
import Card from './Card'
import './Category.css'
import PopupCat from './PopupCat'



function Category() {
    const [show, setShow] = useState(false)

    return (
        <div className='cat' style={{ width: '100%' }}>


            <div className="name">
                <p>Physics Laboratory</p>
            </div>

            <div className="add " onClick={() => { setShow(true) }}>
                <div className="addtxt">
                    <i className="addico fa-solid fa-circle-plus"><p style={{ fontFamily: 'Arial',    paddingtop: "4px" }}> New Category</p>   </i>
                </div>

                <p className='p'  >Physics Lab Equipment Category</p>
            </div>

            <div  className=" cardsec col-12 col-sm-6 col-md-4 col-lg-4 ">
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

            {show && <PopupCat onClose={() => setShow(false)} />}


        </div>
    )
}

export default Category
