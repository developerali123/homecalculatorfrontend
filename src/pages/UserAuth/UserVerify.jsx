import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerificationInput from "react-verification-input";
import { clearEmail } from '../../slices/emailslice';
import Sidediv from '../Auth/Sidediv';
import { useAuth } from '../../AuthProvider';
import { clearPassword } from '../../slices/passwordslice';

const UserVerify = () => {
    const email = useSelector(state => state.email);
    const password = useSelector(state => state.password);
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        verificationCode: "",
    });

    const handleVerificationInputChange = (value) => {
        setForm({ ...form, verificationCode: value });
    };

    const handleLoginClick = async () => {
        if (form.verificationCode === "") {
            toast.error('נא למלא קוד אימות');
            return;
        }



        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/verify', {
                email: email,
                verificationCode: form.verificationCode
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('האימות הצליח!');

            auth.loginAction({
                email: email,
                password: password,
            });
            toast.success('הכניסה הצליחה!');
            // Clear the email from Redux state
            dispatch(clearEmail());
            dispatch(clearPassword());

            // Navigate to the login page
        } catch (error) {
            toast.error('אימות נכשל');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl'>קוד אימות</h1>
                    <h2 className='text-sm'>שלחנו קוד אימות אל</h2>
                    <h2>{email}</h2>
                    <div className='flex flex-col mt-5'>
                        <div className='flex justify-center'>
                            <VerificationInput onChange={handleVerificationInputChange} />
                        </div>
                        <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleLoginClick}>אמת</button>
                        <p className='text-center mt-10'>לא קיבלת אימייל?</p>
                        <p className='text-center'>בדוק את תיבת הדואר הנכנס או תיקיית הדואר זבל שלך</p>
                        <p className='text-center'><span className='text-[#2676E5]'><Link to="/userregister">שלח שוב אימייל</Link></span> או <span className='text-[#2676E5]'><Link to="/userregister">התחבר עם כתובת דוא"ל אחרת.</Link></span></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserVerify;
