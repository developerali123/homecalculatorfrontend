import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setEmail } from '../../slices/emailslice';
import Sidediv from '../Auth/Sidediv';
import { setPassword } from '../../slices/passwordslice';

const UserRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setcount] = useState(1);
    const [userType, setUserType] = useState("user");
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmpassword: "",
        agreed: false,
    });

    useEffect(() => { }, [count]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm({ ...form, [name]: checked });
    };

    const handlestepone = async () => {
        if (form.fullName === "") {
            toast.error('נא למלא שם מלא');
            return;
        }
        if (form.password === "") {
            toast.error('נא למלא סיסמה');
            return;
        }
        if (form.password.length < 8) {
            toast.error('אורך הסיסמה צריך להיות גדול מ-8');
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
        setcount(2);
    };

    const handleprevious = () => {
        setcount((prevCount) => prevCount - 1);
    };

    const handlestepthree = async () => {
        if (form.email === "") {
            toast.error('נא למלא דוא"ל');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('אנא הזן כתובת דוא"ל חוקית');
            return;
        }
        if (!form.agreed) {
            toast.error('נא להסכים למדיניות הפרטיות');
            return;
        }


        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/register', {
                name: form.fullName,
                email: form.email,
                password: form.password,
                userType: userType
            });

            toast.success('ההרשמה הצליחה!');
            dispatch(setEmail(form.email));
            dispatch(setPassword(form.password));
            navigate("/userverify")
            // Handle any additional logic, such as redirecting to another page
        } catch (error) {
            toast.error('אירעה שגיאה. אנא נסה שוב מאוחר יותר.');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl font-semibold'>צור את חשבונך</h1>
                    {count == 1 && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>שם מלא</h3>
                            <input
                                name='fullName'
                                value={form.fullName}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="הזן את שמך המלא"
                            />
                            <h3 className='mb-1'>סיסמה</h3>
                            <input
                                name='password'
                                value={form.password}
                                onChange={handleFormChange}
                                type='password'
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="הזן לפחות 8 תווים"
                            />
                            <h3 className='mb-1'>אימות סיסמה</h3>
                            <input
                                name='confirmpassword'
                                value={form.confirmpassword}
                                onChange={handleFormChange}
                                type='password'
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="הזן לפחות 8 תווים"
                            />
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepone}>הבא</button>
                            <p className='text-center mt-5'>כבר יש לך חשבון? <span className='text-[#2676E5]'><Link to="/userlogin">התחבר</Link></span></p>
                        </div>
                    )}
                    {count == 2 && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>דוא"ל</h3>
                            <input
                                name='email'
                                value={form.email}
                                type='email'
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="הזן את כתובת הדואר האלקטרוני שלך"
                            />

                            <div className='flex justify-center items-center'>
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>הקודם</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepthree}>הבא</button>
                            </div>
                            <div className='flex mt-5 justify-center items-center'>
                                <input
                                    type="checkbox"
                                    name="agreed"
                                    checked={form.agreed}
                                    onChange={handleCheckboxChange}
                                    className='mr-2'
                                />
                                <p>המשך בכך, אתה מסכים ל</p>
                            </div>
                            <p className='text-center'><span className='text-[#2676E5]'>תנאי השימוש</span> ו<span className='text-[#2676E5]'> מדיניות הפרטיות</span></p>
                            <p className='text-center mt-5'>כבר יש לך חשבון? <span className='text-[#2676E5]'><Link to="/userlogin">התחבר</Link></span></p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default UserRegister;
