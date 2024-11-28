import React, { useState } from 'react'
import './ViewAll.css'
import PopDelete from './PopDelete'
import Addequipment from './Addequipment'

function ViewAll() {
    const [pop, setPop] = useState(false)
    const [pope, setPope] = useState(false)
    const [item, setItem] = useState(null);



    const edit = (item_from_click) => {
        setPope(true)
        setItem(item_from_click)
        console.log("Item selected : ",item)
    }


    const [details, setDetails] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id='alltable' >
            <h2 style={{ marginBottom: '30px', marginTop: '30px' }}>Equipment Equipments List </h2>

            <h2 className='h2add' onClick={() => setPope(true)}><span className='span'> +  </span>  Add New </h2>


            <div className="table">

                <table>

                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>QUANTITY</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>

                    {/* <tr>
                        <td>1</td>
                        <td>Multimiter</td>
                        <td>5</td>
                        <td>yes</td>
                        <td>19/02/2001</td>
                        <td style={{ color: 'blue' }}>
                            <span style={{ cursor: "pointer" }} onClick={() => setPope(true)}  >Edit</span>  |
                            <span style={{ cursor: "pointer" }} onClick={() => setPop(true)}>Delete</span></td>
                    </tr> */}
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.status}</td>
                            <td>{item.date}</td>
                            <td style={{ color: 'blue' }}>
                                <span style={{ cursor: "pointer" }} onClick={()=> edit(item)}  >Edit</span>  |
                                <span style={{ cursor: "pointer" }} onClick={() => setPop(true)}>Delete</span></td>
                        </tr>
                    ))}
                </table>

            </div>
            {pop && <PopDelete onhide={() => setPop(false)} />}
            {pope && <Addequipment ongo={() => setPope(false)} item={item} />}

        </div>
    )
}

export default ViewAll
