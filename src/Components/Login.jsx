import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../Api';

function Login() {
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate("/");
    };

    const val = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value,
        })
    }

    // const sublitlog = (e) => {
    //     e.preventDefault();
    //     console.log(formData)
    // }

    const sublitlog = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const data = await loginUser(formData); // Call login API
            console.log('Login response:', data); // Log the response

            if (data) {  // Ensure the token is present in the response
                localStorage.setItem('token', data); // Store the token
                console.log('Token stored in localStorage:', localStorage.getItem('token'));
                navigate("/category"); // Redirect after successful login
            } else {
                console.error('Login failed! Token missing from response.');
                setErrorMessage('Login failed! Token missing.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Login failed! Please check your credentials.');
        }
        // try {
        //     const token = await loginUser(formData); // Call login API
        //     console.log('Login response:', token); // Log the plain string token
    
        //     if (token) { // If the token is present
        //         localStorage.setItem('token', token); // Store the token directly
        //         console.log('Token stored in localStorage:', localStorage.getItem('token'));
        //         navigate("/category"); // Redirect after successful login
        //     } else {
        //         console.error('Login failed! Token missing from response.');
        //         setErrorMessage('Login failed! Token missing.');
        //     }
        // } catch (error) {
        //     console.error('Error during login:', error);
        //     setErrorMessage('Login failed! Please check your credentials.');
        // }
    };



    return (
        <div className='loginpage'>
            <div className='loginbody'>
                <div className="form">
                    <div className="login">
                        <h1 className='h1login'>Log In</h1>
                        <form onSubmit={sublitlog}>
                            <div className="userdetails">
                                <input id="email" placeholder='Email' type="text" name="username" value={formData.username} onChange={val} required /><br />

                                <input type="password" id='password' placeholder='password' name="password" value={formData.password} onChange={val} required /><br />
                            </div>

                            <div className="submitformbtn">
                                <button type='submit' id='loginbtn'>Log In</button> <br />
                                <p className='register'>Don't have an account? <Link to="/reg">Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
