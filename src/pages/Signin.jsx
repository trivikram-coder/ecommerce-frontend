import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/forms.css';

const Signin = () => {
    const [formData, setFormData] = useState({
        rollNo: "",
        password: ""
    });
    const [res, setRes] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function signin(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setRes("Login successful!");
               
              navigate('/product')

            } else {
                setRes(data.message || "Invalid credentials");
            }
        } catch (error) {
            setRes("Error connecting to the server");
        }
    }

    return (
        <div className='body'> 
            <div className="form1">
                <div className='inputs'>
                    <h2>Vk Store <ShoppingBag size={26} /></h2>
                    <h3>Sign in</h3>
                    
                    <div className="form-group">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="floatingInput" 
                                name="rollNo"
                                placeholder="Roll Number" 
                                onChange={handleChange} 
                            />
                            <label htmlFor="floatingInput">Roll Number</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="floatingPassword" 
                                name="password"
                                placeholder="Password" 
                                onChange={handleChange} 
                            />
                            <label htmlFor="floatingPassword">Password</label> 
                        </div>
                    </div>

                    <div className="form-group">
                        <button className='btn btn-primary w-100' onClick={signin}>Sign in</button>
                        <div className="mt-2">
                            <Link to='/signup' className='btn btn-dark w-100'>Sign up</Link>
                            <p className='text-danger text-center m-4'>{res}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} Vk Store. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Signin;
