import React, { useState } from 'react'
import Card from './Card'
import './Category.css'
import PopupCat from './PopupCat'



function Category() {
    const [show, setShow] = useState(false)

    const data = [
        { title: "Multimeter", description: "This is the first card" },
        { title: "Card 1", description: "This is the second card" },
        { title: "Card 2", description: "This is the third card" },
        { title: "Card 3", description: "This is the third card" },
        { title: "Card 4", description: "This is the third card" },
        { title: "Card 5", description: "This is the third card" },
        { title: "Card 6", description: "This is the third card" },
        { title: "Card 7", description: "This is the third card" },
        { title: "Card 8", description: "This is the third card" },
        { title: "Card 9", description: "This is the third card" },
        { title: "Card 10", description: "This is the third card" },
    ];

    return (
        <div className='cat' style={{ width: '100%' }}>


            <div className="name">
                <p>Physics Laboratory</p>
            </div>

            <div className="add " onClick={() => { setShow(true) }}>
                <div className="addtxt">
                    <i className="addico fa-solid fa-circle-plus"><p style={{ fontFamily: 'Arial', paddingtop: "4px" }}> New Category</p>   </i>
                </div>

                <p className='p'  >Physics Lab Equipment Category</p>
            </div>

            <div className=" cardsec col-12 col-sm-6 col-md-4 col-lg-4 ">
                <div className="row">
                    {data.map((item, index) => (

                        <Card key={index} title={item.title} description={item.description} />
                    ))}

                    
                </div>
            </div>

            {show && <PopupCat onClose={() => setShow(false)} />}


        </div>
    )
}

export default Category
