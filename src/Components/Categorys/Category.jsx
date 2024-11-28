import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Category.css'
import PopupCat from './PopupCat'
// import axios from 'axios'
import axios from 'axios'
// import cors from 'cors'; 
import { fetchCategories } from '../../Api'

function Category() {
    const [show, setShow] = useState(false)
    const [myData, setMyData] = useState(null)
    const [mycat, setMycat] = useState([])
    const [error, setError] = useState("")

    // cors();

    const url = 'http://localhost:8080/categories'


    useEffect(() => {
        let data = JSON.stringify({
            "username": "Ganesh",
            "password": "password123",
            "email": "Ganesh@example.com"
        });
        const token = localStorage.getItem('token');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/categories',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setMycat(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);




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
                    {mycat.length > 0 ? (
                        mycat.map((post) => {
                            const { id, name, description } = post;
                            return <Card key={id} title={name}  />
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
