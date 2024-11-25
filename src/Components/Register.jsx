import React, { useEffect, useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/reg");
    };


   


    return (
        <div className='regpage'>
            <div className='regbody'>
                <div className="form">
                    <div className="reg">
                        <h1 className='h1reg'>Register</h1>
                        <form action="">
                            <div className="userdetails">

                                <input type="text" id="username" placeholder='Full Name' /><br />

                                <input type="email" id="email" placeholder='Email' /><br />

                                <input type="password" id='password' placeholder='Password' /><br />

                                <input type="password" id='confirmpass' placeholder='Confirm Password' /><br />
                            </div>

                            <div className="submitformbtn">
                                <button type='submit' id='regbtn'>Sign Up</button> <br />
                                <p className='login'>Already have an account? <Link to="/">Log In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
