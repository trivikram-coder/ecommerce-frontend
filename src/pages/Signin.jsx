import React from 'react';
import { Link } from 'react-router-dom';
const Signin = () => {
    return (
        <>
        
        
           
        <div className="form">
       <form className='inputs'>
       <h2>Vk Store</h2>
       <h3 >Login</h3>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="email"
                           
                        />
                        <br />
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <br />
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="pass"
                            required
                        />
                      
                    </div>
                    <div className="form-group">
                  
                        <button className='btn btn-primary w-100'>Login</button>
                        <Link to='/signup' className='btn btn-dark'>Register</Link>
                    </div>
                    </form>
                    </div>
                    
        </>
    );
};

export default Signin;
