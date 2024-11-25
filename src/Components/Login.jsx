// import React, { useEffect, useState } from 'react'
// import "./Login.css"
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
    
//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     });
    
//     const navigate = useNavigate();
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         navigate("/");
//     };

//     const val = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData, [name]: value,
//         })
//     }

//     // const sublitlog = (e) => {
//     //     e.preventDefault();
//     //     console.log(formData)
//     // }
    
//     const sublitlog = async (e) => {
//         e.preventDefault();
//             console.log(formData)
//         try {
//             const response = await axios.post('http://localhost:8080/api/auth/login', formData);
//             console.log('Response from backend:', response.data);
//         } catch (error) {
//             console.error('Error sending data to backend:', error);
//         }
//     };

//     return (
//         <div className='logpage'>
//             <div classNamre='logbody'>
//                 <div className="form">
//                     <div className="log">
//                         <h1 className='h1log'>Login</h1>
//                         <form onSubmit={sublitlog}>

//                             <div className="idpass">

//                                 <input id="mail" placeholder='User ID' type="text" name="username" value={formData.username} onChange={val} /><br></br>

//                                 <input id='pass' placeholder='password' type="password" name="password" value={formData.password} onChange={val} />
//                             </div>
//                             <div className="chck">
//                                 <input type="checkbox" />
//                                 <label htmlFor="">Show Password</label>
//                             </div>

//                             <div className="submitformbtn">

//                                 <button type='submit' id='logbtn' >Log In</button> <br />
//                                 <a href="#" class='forget'>Forget Password?</a>


//                                 <p className='signup'>Don't have an account?  </p><Link to="/reg">Sign Up</Link>
//                             </div>

//                         </form>


//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login


import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to validate the login details and navigate accordingly
        navigate("/dashboard"); // Redirect to dashboard or any desired route on success
    };

    return (
        <div className='loginpage'>
            <div className='loginbody'>
                <div className="form">
                    <div className="login">
                        <h1 className='h1login'>Log In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="userdetails">
                                <input type="email" id="email" placeholder='Email' required /><br />

                                <input type="password" id='password' placeholder='Password' required /><br />
                            </div>

                            <div className="submitformbtn">
                                <button type='submit' id='loginbtn'>Log In</button> <br />
                                <p className='register'>Don't have an account? <Link to="/register">Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
