import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthProvider';
import Sidediv from './Sidediv';

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token && auth.userType === "company") {
            navigate('/dashboard');
        }
    }, [auth.token, navigate]);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleLoginClick = async () => {
        if (form.email === "") {
            toast.error('נא למלא דוא"ל');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('אנא הזן כתובת דוא"ל חוקית');
            return;
        }
        if (form.password === "") {
            toast.error('נא למלא סיסמה');
            return;
        }

        try {
            auth.loginAction(form);
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('הכניסה הצליחה!');
        } catch (error) {
            toast.error('אישורים לא חוקיים. אנא נסה שוב.');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl'>ברוך הבא ל-Click n Move</h1>
                    <h2 className='text-sm'>התחל על ידי יצירת חשבון משתמש חינמי</h2>
                    <div className='flex flex-col'>
                        <h3 className='mb-1 mt-10'>דוא"ל</h3>
                        <input
                            name='email'
                            value={form.email}
                            onChange={handleFormChange}
                            className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                            placeholder="הזן כתובת דואר אלקטרוני"
                        />
                        <h3 className='mb-1'>סיסמה</h3>
                        <input
                            name='password'
                            value={form.password}
                            type='password'
                            onChange={handleFormChange}
                            className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
                            placeholder="הזן סיסמה"
                        />
                        <div className='flex justify-between mt-2'>
                            <h3 className='text-[#2676E5]'><Link to="/forgetpassword">שכחת סיסמה</Link></h3>
                            <div className='flex'>
                                <input type="checkbox" name="" id="" className='mr-2' />
                                <h3>זכור אותי</h3>
                            </div>
                        </div>
                        <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleLoginClick}>התחבר</button>
                        <p className='text-center mt-10'>עדיין אין לך חשבון? <span className='text-[#2676E5]'><Link to="/register">הירשם</Link></span></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;
