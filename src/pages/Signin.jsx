import { ShoppingBag } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
const Signin = () => {
    return (
        <> 
        <div className="form">
       <form className='inputs'>
       <h2>Vk Store <ShoppingBag size={26}/></h2>
       <h3 >Sign in</h3>
                    <div className="form-group">
                    <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
                       
                    </div>
                    <div className="form-group">
                    <div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
  <label htmlForfor="floatingPassword">Password</label>
</div>
                    </div>
                    <div className="form-group">
                  
                        <button className='btn btn-primary w-100'>Sign in</button>
                        <Link to='/signup' className='btn btn-dark'>Sign up</Link>
                    </div>
                    </form>
                    </div>
                    <div className="footer">
                        <p>
                            &copy; 2025 Vk Store. All Rights Reserved 
                        </p>
                    </div>
        </>
    );
};

export default Signin;
