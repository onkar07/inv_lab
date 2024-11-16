import React from 'react'
import "./Login.css"

function Login() {
    return (
        <div class='logbody'>
            <div className="form">
            <div class="log">
                <h1 class='h1log'>Login</h1>
                <form action="">
                    <div className="idpass">

                        {/* <label htmlFor="mail">User ID :</label> */}
                        <input type="email" id="mail" placeholder='User ID' /><br></br>

                        {/* <label htmlFor="pass">password :</label> */}
                        <input type="password" id='pass' placeholder='password' />
                    </div>
                    <input type="checkbox" />
                    <label htmlFor="">Show Password</label>

                    <div className="submitformbtn">

                        <button type='submit' id='logbtn'>Log In</button>
                        <a href="#" class='forget'>Forget Password?</a>


                        <p class='signup'>Don't have an account? <a href="#">Sign Up</a> </p>
                    </div>
                </form>


            </div>
            </div>
        </div>
    )
}

export default Login
