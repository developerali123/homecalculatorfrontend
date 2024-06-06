import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerificationInput from 'react-verification-input';
import { clearEmail, setEmail } from '../../slices/emailslice';
import Sidediv from './Sidediv';

const ForgetPassword = () => {
    const email = useSelector(state => state.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setcount] = useState(1);
    const [form, setForm] = useState({
        email: "",
        verificationCode: "",
        password: "",
        confirmpassword: ""
    });

    const handleVerificationInputChange = (value) => {
        setForm({ ...form, verificationCode: value });
    };

    useEffect(() => { }, [count]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleVerifyEmail = async () => {
        if (form.email === "") {
            toast.error('נא למלא דוא"ל');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('אנא הזן כתובת דוא"ל חוקית');
            return;
        }

        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/verifyemail', {
                email: form.email,
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('אימייל קיים!');
            setcount(2);
            dispatch(setEmail(form.email));
            return;
        } catch (error) {
            toast.error('דוא"ל לא קיים ');
            return;
            // Handle any error messages or logging
        }
    };

    const handleVerifyCode = async () => {
        if (form.verificationCode === "") {
            toast.error('נא למלא קוד אימות');
            return;
        }


        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/verifycode', {
                email: email,
                verificationCode: form.verificationCode
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('האימות הצליח!');
            setcount(3);
            return;
        } catch (error) {
            toast.error('אימות נכשל');
            return;
            // Handle any error messages or logging
        }
    };

    const handlePasswordReset = async () => {
        if (form.password === "") {
            toast.error('נא למלא סיסמה');
            return;
        }
        if (form.password.length < 8) {
            toast.error('אשר את אורך הסיסמה צריך להיות גדול מ-8');
            return;
        }
        if (form.confirmpassword === "") {
            toast.error('נא למלא סיסמה לאשר');
            return;
        }
        if (form.confirmpassword.length < 8) {
            toast.error('אשר את אורך הסיסמה צריך להיות גדול מ-8');
            return;
        }
        if (form.confirmpassword != form.password) {
            toast.error('סיסמה ואישור סיסמה חייבות להיות זהות');
            return;
        }

        try {
            const response = await axios.put('https://homecalculatorbackend-ni04.onrender.com/api/updatepassword', {
                email: email,
                password: form.password
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('סיסמה חדשה נוצרה!');
            // Clear the email from Redux state
            dispatch(clearEmail());
            navigate('/');

        } catch (error) {
            toast.error('אישורים לא חוקיים. אנא נסה שוב.');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            {count == 1 && (
                <div className='md:col-span-8 col-span-12 bg-white'>
                    <div className='flex justify-center items-center flex-col h-full'>
                        <h1 className='text-3xl'>שכחת סיסמה</h1>
                        <p className='w-96'>הזן את הדוא"ל שבו יצרת את החשבון שלך כדי שנוכל לשלוח לך הוראות על כיצד לאפס את הסיסמה שלך.</p>
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-10'>דוא"ל</h3>
                            <input
                                name='email'
                                value={form.email}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="הזן את כתובת הדואר האלקטרוני שלך"
                            />
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleVerifyEmail}>אמת דוא"ל</button>
                        </div>
                    </div>
                </div>
            )}
            {count == 2 && (
                <div className='md:col-span-8 col-span-12 bg-white'>
                    <div className='flex justify-center items-center flex-col h-full'>
                        <h1 className='text-3xl'>קוד אימות</h1>
                        <h2 className='text-sm'>שלחנו קוד אימות אל</h2>
                        <h2>{email}</h2>
                        <div className='flex flex-col mt-5'>
                            <div className='flex justify-center'>
                                <VerificationInput onChange={handleVerificationInputChange} />
                            </div>
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleVerifyCode}>אמת</button>
                            <p className='text-center mt-10'>לא קיבלת את הדוא"ל?</p>
                            <p className='text-center'>בדוק את תיבת הדואר הנכנס או את תיקיית הזבל</p>
                            <p className='text-center'><span className='text-[#2676E5]'><Link to="/register">שלח דוא"ל שוב</Link></span></p>
                        </div>
                    </div>
                </div>
            )}
            {count == 3 && (
                <div className='md:col-span-8 col-span-12 bg-white'>
                    <div className='flex justify-center items-center flex-col h-full'>
                        <h1 className='text-3xl'>צור סיסמה חדשה</h1>
                        <h2 className='text-sm'>בחר סיסמה חדשה לחשבונך</h2>
                        <div className='flex flex-col'>
                            <h3 className='mb-1'>סיסמה</h3>
                            <input
                                name='password'
                                value={form.password}
                                type='password'
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
                                placeholder="הזן לפחות 8 תווים"
                            />
                            <h3 className='mb-1'>אימות סיסמה</h3>
                            <input
                                name='confirmpassword'
                                value={form.confirmpassword}
                                type='password'
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
                                placeholder="הזן לפחות 8 תווים"
                            />
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlePasswordReset}>צור</button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default ForgetPassword;
