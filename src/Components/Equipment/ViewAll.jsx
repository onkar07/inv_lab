import React, { useState } from 'react'
import './ViewAll.css'
import PopDelete from './PopDelete'
import Addequipment from './Addequipment'

function ViewAll() {
    const [pop, setPop] = useState(false)
    const [pope, setPope] = useState(false)
    const [item, setItem] = useState(null);



    const items = [
        { id: 1, name: "Multimeter", qty: "5", status: "ok", date: "19/02/2001" },
        { id: 2, name: "Oscilloscope", qty: "3", status: "ok", date: "15/08/2020" },
        { id: 3, name: "Power Supply", qty: "8", status: "maintenance", date: "01/12/2022" },
        { id: 4, name: "Soldering Iron", qty: "10", status: "ok", date: "25/05/2023" },
        { id: 5, name: "Thermal Camera", qty: "2", status: "ok", date: "12/10/2021" },
        { id: 6, name: "Clamp Meter", qty: "7", status: "ok", date: "03/03/2023" },
        { id: 7, name: "Signal Generator", qty: "4", status: "calibration", date: "20/06/2020" },
        { id: 8, name: "Frequency Counter", qty: "6", status: "ok", date: "11/11/2022" }
    ];

    const edit = (item_from_click) => {
        setPope(true)
        setItem(item_from_click)
        console.log("Item selected : ",item)
    }

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
