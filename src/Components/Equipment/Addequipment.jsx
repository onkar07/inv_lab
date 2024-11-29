import React, { useRef, useEffect, useState } from 'react';
import './Addequipment.css';

function Addequipment({ ongo, item }) {
    console.log(item);

    const nameRef = useRef(null);
    const qtyRef = useRef(null);
    const dateRef = useRef(null);
    const [working, setWorking] = useState(false); // State for the checkbox
    const [category, setCategory] = useState(""); // State for category selection

    useEffect(() => {
        console.log(item);
        if (item) {
            nameRef.current.value = item.name || "";
            qtyRef.current.value = item.qty || "";
            dateRef.current.value = item.date || "";
            setWorking(item.status);  // Assuming "status" corresponds to the working status (true/false)
            setCategory(item.category || "");  // If category exists
        }
    }, [item]);

    const submit = (e) => {
        e.preventDefault();

        // Access the values using refs
        const updatedData = {
            name: nameRef.current?.value || "",
            qty: qtyRef.current?.value || "",
            date: dateRef.current?.value || "",
            status: working, // Include the checkbox status
            category: category, // Include the selected category
        };

        console.log("Updated Data:", updatedData);
        ongo(); // Close the popup after submitting
    };

    return (
        <div>
            <div className="equipments">
                <h2 id="h3" style={{ paddingTop: '20px', paddingBottom: '20px' }}>Edit Equipment List</h2>
                <i onClick={ongo} className="fa-solid fa-xmark cross"></i>

                <div className="info">
                    <form onSubmit={submit}>
                        <label id="lab" htmlFor="">Item</label>
                        <input 
                            id="inp" 
                            type="text" 
                            placeholder="Item name" 
                            ref={nameRef} 
                        />
                        <br />
                        <label id="lab" className="qtylab" htmlFor="">Quantity</label>
                        <input 
                            id="inp" 
                            className="qty" 
                            type="text" 
                            ref={qtyRef} 
                        />
                        <br />
                        <div className="workd">
                            <label className="worklab" htmlFor="">Working</label>
                            <input 
                                type="checkbox" 
                                checked={working} 
                                onChange={() => setWorking(!working)} // Toggle working status
                            />
                        </div>
                        <br />

                        <div className="cate">
                            <label id="lab" className="dropl" htmlFor="">Category</label>
                            <select 
                                name="category" 
                                className="drop" 
                                id="inp1" 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" disabled>-- Choose an Option --</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Mathematics">Mathematics</option>
                            </select>
                        </div>
                        <br />

                        <label id="lab" htmlFor="">Date</label>
                        <input 
                            id="inp" 
                            type="date" 
                            ref={dateRef} 
                        />
                    </form>
                </div>

                <div className="btnss">
                    <button id="btn1" className="noselect">
                        <span className="text">Submit</span>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                            </svg>
                        </span>
                    </button>

                    <button onClick={ongo} id="btn2" className="noselect">
                        <span className="text">Cancel</span>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addequipment;
