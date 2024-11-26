import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Category.css'
import PopupCat from './PopupCat'
// import axios from 'axios'
import axios from 'axios'
// import cors from 'cors'; 
import {fetchCategories } from '../../Api'

function Category() {
    const [show, setShow] = useState(false)
    const [mydata, setMydata] = useState([])
    const [error, setError] = useState("")
    // cors();
    
    const url = 'http://localhost:8080/categories'

    // useEffect(() => {
    //     const getdata = async () => {

    //         try {
    //             const res = await axios.get(url)
    //             setMydata(res.data);
    //             console.log(res.data)
    //         } catch (error) {
    //             setError(error.message)
    //         }

    //     }
    //     getdata();
    //     return () => {

    //     }
    // }, [])

    // console.log(url)


    // useEffect(() => {
    //     const getdata = async () => {
    //         try {
    //             const res = await fetchCategories(); // Using the fetchCategories function
    //             setMydata(res); // Store categories in state
    //             console.log(res);
    //         } catch (error) {
    //             setError(error.message);
    //             console.error('Error fetching categories:', error);
    //         }
    //     };
    //     getdata();
    // }, []);

    


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
                    {mydata.length > 0 ? (
                        mydata.map((post) => {
                            const { id, name, description } = post;
                            return <Card key={id} title={name} body={description} />
                        })
                    ) :
                        (<p>No categories available</p>)
                    }
                </div>
            </div>

            {show && <PopupCat onClose={() => setShow(false)} />}


        </div>
    )
}

export default Category
