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
       <h3>Sign up</h3>
                    <div className="form-group">
                                         <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
                       
                    </div>
                    <div className="form-group">
                                            <div className="form-floating mb-3">
  <input type="password" className="form-control" id="floatingInput" placeholder="password"/>
  <label htmlFor="floatingInput">Password</label>
</div>
                      
                    </div>
                    <div className="form-group">
                                        <div className="form-floating mb-3">
  <input type="password" className="form-control" id="floatingInput" placeholder="confirm password"/>
  <label htmlFor="floatingInput">Confirm password</label>
</div>
                      
                    </div>
                    <div className="form-group">
                  
                      <button className='btn btn-primary'>Sign up</button>
                      <Link to='/' className='btn btn-dark'>Sign in</Link>
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
