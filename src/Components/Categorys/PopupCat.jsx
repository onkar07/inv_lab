import React, { useRef, useState } from 'react'
import './PopupCat.css'

function PopupCat({ onClose }) {

    const popRef = useRef();

    const closePop = (e) => {
        if (popRef.current === e.target) {
            onClose();
        }
    }


    //add category
    const [addData, setAddData] = useState({ name: '', date: '', working: false })
    const addUrl = 'http://localhost:8080/categories'

    const handleadd = async (e) => {
        e.preventDefault();

        if (!addData.name || !addData.date) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch(addUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addData)
                })

            if (res.ok) {
                alert('Category added successfully');
                setAddData({ name: '', date: '', working: false });
            } else {
                // const errorData = await res.json();
                alert('Failed to add category');
            }
        } catch (error) {
            console.log("error: ", error);

        }

    }

    return (
        <div className='popup' ref={popRef} onClick={closePop} >

            <h2 id='h2'>Add New Category</h2>
            <i onClick={onClose} className="fa-solid fa-xmark cross"></i>

            <form onSubmit={handleadd}>
                <div id="inputsform">
                    <div className="namee">

                        <label className='lable1'>Name </label>
                        {/* <input className='in1' type='text' value={addData.name}
                            onChange={(e) => setAddData({ ...addData, name: e.target.value })} /> */}
                        <input className='in1' type='text' value={addData.name}
                            onChange={(e) => setAddData({ ...addData, name: e.target.value })} />
                    </div>

                    <br />
                    <div className="date">

                        <label className='lable2'>Date </label>
                        {/* <input className='in2' type='date' value={addData.Date} onChange={(e) => setAddData({ ...addData, date: e.target.value })} /> */}

                        <input className='in2' type='date' value={addData.date}
                            onChange={(e) => setAddData({ ...addData, date: e.target.value })} />
                    </div>
                    <br />
                    <div className="working">

                        <label className='lable3'>Working </label>
                        {/* <input className='in3' type="checkbox" value={addData.working} onChange={(e) => setAddData({ ...addData, working: e.target.value })} /> */}
                        <input className='in3' type="checkbox" checked={addData.working}
                            onChange={(e) => setAddData({ ...addData, working: e.target.checked })} />

                    </div>

                </div>
                <div className="btns">

                    {/* <button>Submit</button> */}
                    <button id="btn1" onClick={onClose} type="submit" className="noselect"><span class="text">Submit</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></span></button>

                    {/* <button>Delete</button> */}
                    <button onClick={onClose} id="btn2" className="noselect"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                </div>
            </form>
        </div>
    )
}

export default PopupCat
