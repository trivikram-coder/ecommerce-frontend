import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
        <div className="body">
        
        <div className="form">
           
       <form className='inputs'>
       <h2>Vk Store</h2>
       <h3>Register</h3>
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
                            
                        />
                      
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Confirm Password</label>
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="pass"
                            
                        />
                      
                    </div>
                    <div className="form-group">
                  
                      <button className='btn btn-primary'>Register</button>
                      <Link to='/' className='btn btn-dark'>Login</Link>
                    </div>
                    </form>
                    </div>
                    </div>
        </>
    );
};

export default Signup;
