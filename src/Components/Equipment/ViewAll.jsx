import React, { useEffect, useState } from 'react'
import './ViewAll.css'
import PopDelete from './PopDelete'
import Addequipment from './Addequipment'
import { useParams } from 'react-router-dom'

function ViewAll() {
    const [pop, setPop] = useState(false)
    const [pope, setPope] = useState(false)
    const [item, setItem] = useState(null);
    const { id } = useParams()
    const edit = (item_from_click) => {
        setPope(true)
        setItem(item_from_click)
        console.log("Item selected : ", item)
    }

    const [items, setitems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("handle ",id)
        const fetchItems = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:8080/items');
                if (!res.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await res.json();
                setitems(data)
                setError(null);
                // console.log(data);
                
            } catch (error) {
                setError(error.message);
                console.log("error :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [])
    if (loading) {
        return <div>Loading...</div>;  // Show loading text while fetching
    }

    if (error) {
        return <div>Error: {error}</div>;  // Show error message if any
    }

    return (
        <div id='alltable' >
            <h2 style={{ marginBottom: '30px', marginTop: '30px' }}>{items.category} Equipments List </h2>

            <h2 className='h2add' onClick={() => setPope(true)}><span className='span'> +  </span>  Add New </h2>


            <div className="table">

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>QUANTITY</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.status ? 'Active' : 'Inactive'}</td>
                                <td>{item.date}</td>
                                <td style={{ color: 'blue' }}>
                                    <span style={{ cursor: "pointer" }} onClick={() => edit(item)}  >Edit</span> {' '} |{' '}
                                    <span style={{ cursor: "pointer" }} onClick={() => setPop(true)}>Delete</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {pop && <PopDelete onhide={() => setPop(false)} />}
            {pope && <Addequipment ongo={() => setPope(false)} item={item} />}

        </div>
    )
}

export default ViewAll
