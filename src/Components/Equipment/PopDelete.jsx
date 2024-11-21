import React from 'react'
import './PopDelete.css'

function PopDelete({onhide}) {
    return (
        <div>

            <div className="delete">
                <h3 id='h3'>Delete Equipment List</h3>

                <p id='p'>Are you shure ?</p>
                <i id='cross' onClick={onhide} className="fa-solid fa-xmark cross"></i>

                <div className="btns">


                    {/* <button>Submit</button> */}
                    <button id="btn2" className="noselect"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></span></button>

                    {/* <button>Delete</button> */}
                    <button onClick={onhide} id="btn1" className="noselect"><span class="text">Cancel</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                </div>

            </div>
        </div>
    )
}

export default PopDelete
