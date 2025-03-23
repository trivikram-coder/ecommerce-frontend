import { ShoppingBag } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
        <div className="body">
        
        <div className="form">
           
       <form className='inputs'>
       <h2>Vk Store <ShoppingBag size={28}/></h2>
       <h3>Register</h3>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="email"
                           required
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
                        <label htmlFor="Password">Confirm Password</label>
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="pass"
                            required
                        />
                      
                    </div>
                    <div className="form-group">
                  
                      <button className='btn btn-primary'>Register</button>
                      <Link to='/product' className='btn btn-dark'>Login</Link>
                    </div>
                    </form>
                    </div>
                    </div>
                    <div className="footer">
                        <p>
                            &copy; 2025 Vk Store. All Rights Reserved 
                        </p>
                    </div>
        </>
    );
};

export default Signup;
