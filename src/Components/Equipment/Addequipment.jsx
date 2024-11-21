import React, { useRef, useState } from 'react'
import './Addequipment.css'

function Addequipment({ ongo, item }) {
    console.log(item)
    const nameRef = useRef(null);
    const qtyRef = useRef(null);
    const dateRef = useRef(null);

    const updatedData = {
        id: item.id,
        name: nameRef.current.value,
        qty: qtyRef.current.value,
        date: dateRef.current.value,
    };

    return (
        <div>
            <div className="equipments">

                <h2 id='h3' style={{ paddingTop: '20px', paddingBottom: '20px', }} >Edit Equipment List</h2>
                <i onClick={ongo} className="fa-solid fa-xmark cross"></i>

                <div className="info">
<form action="">



                    <label id='lab' htmlFor="">item</label>
                    <input id='inp' type="text" placeholder={item.name}  defaultValue={item.name} ref={nameRef} />
                    <br />
                    <label id='lab ' className='qtylab' htmlFor="">Quantity</label>
                    <input id='inp' className='qty' type="text" name="" />
                    <br />
                    <div className="workd">

                        <label className='worklab' htmlFor="">Working</label>
                        <input type="checkbox" />
                    </div>
                    <br />

                    <div className="cate">

                        <label id='lab' className='dropl' htmlFor="">Categoery</label>
                        <select name="" className='drop' id="inp1">
                            <option value="" disabled selected>-- Choose an Option --</option>
                            <option value="">Physics</option>
                            <option value="">Chemistry</option>
                            <option value="">Mathematics</option>
                        </select>
                    </div>
                    <br />

                    <label id='lab' htmlFor="">Date</label>
                    <input id='inp' type="date" />
                    </form>
                </div>
                <div className="btnss" >

                    {/* <button>Submit</button> */}
                    <button id="btn1" className="noselect"><span class="text">Submit</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></span></button>


                    {/* <button>Delete</button> */}
                    <button onClick={ongo} id="btn2" className="noselect"><span class="text">Cancele</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                </div>
            </div>
        </div>
    )
}

export default Addequipment
