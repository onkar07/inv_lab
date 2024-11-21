import React from 'react'
import "./Login.css"

function Login() {
    return (
        <div className='logpage'>
        <div classNamre='logbody'>
            <div className="form">
            <div className="log">
                <h1 className='h1log'>Login</h1>
                <form action="">
                    <div className="idpass">

                        {/* <label htmlFor="mail">User ID :</label> */}
                        <input type="email" id="mail" placeholder='User ID' /><br></br>

                        {/* <label htmlFor="pass">password :</label> */}
                        <input type="password" id='pass' placeholder='password' />
                    </div>
                    <div className="chck">
                    <input type="checkbox" />
                    <label htmlFor="">Show Password</label>
                    </div>

                    <div className="submitformbtn">

                        <button type='submit' id='logbtn'>Log In</button> <br />
                        <a href="#" class='forget'>Forget Password?</a>


                        <p className='signup'>Don't have an account? <a href="#">Sign Up</a> </p>
                    </div>
                </form>


            </div>
            </div>
        </div>
        </div>
    )
}

export default Login
