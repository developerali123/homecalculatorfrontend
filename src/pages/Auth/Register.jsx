import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setEmail } from '../../slices/emailslice';
import Sidediv from './Sidediv';
import GoogleCityAutocomplete from '../../components/GeogleCityAutocomplete';
import { useJsApiLoader } from '@react-google-maps/api';
import { setPassword } from '../../slices/passwordslice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setcount] = useState(1);
    const [userType, setUserType] = useState("company");
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmpassword: "",
        companyName: "",
        agreed: false,
        numberOfTrucks: "1-10",
        phoneNumber: "",
        city: "",
        companyId: null
    });

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAuIchE5mdfEw_S7oM8I5ZkpCcQyWOMg-Y',
        libraries: ['places']
    })

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
    const handlesteptwo = async () => {
        if (form.companyName === "") {
            toast.error('נא למלא שם חברה');
            return;
        }
        if (form.companyId === "") {
            toast.error('נא למלא את מזהה החברה');
            return;
        }
        if (form.phoneNumber === "") {
            toast.error('נא למלא את מספר הטלפון של החברה');
            return;
        }
        setcount(3);
    };

    const handleprevious = () => {
        setcount((prevCount) => prevCount - 1);
    };

    const handlestepthree = async () => {
        if (form.city === "") {
            toast.error('נא למלא עיר');
            return;
        }
        setcount(4);
    };

    const handlestepfour = async () => {
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

        console.log(form);
        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/register', {
                name: form.fullName,
                email: form.email,
                password: form.password,
                userType: userType
            });
            const response1 = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/company/add', {
                companyName: form.companyName,
                userId: response?.data?.userId,
                numberOfTrucks: form.numberOfTrucks,
                city: form.city,
                companyId: form.companyId,
                phoneNumber: form.phoneNumber
            });
            toast.success('ההרשמה הצליחה!');
            dispatch(setEmail(form.email));
            dispatch(setPassword(form.password));
            navigate("/verify")
            // Handle any additional logic, such as redirecting to another page
        } catch (error) {
            toast.error('אירעה שגיאה. אנא נסה שוב מאוחר יותר.');
            // Handle any error messages or logging
        }
    }

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl font-semibold'>צור את החשבון שלך</h1>
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
                                onFocus={true}
                                onBlur={false}
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
                            <p className='text-center mt-5'>כבר יש לך חשבון? <span className='text-[#2676E5]'><Link to="/login">התחבר</Link></span></p>
                        </div>
                    )}
                    {count == 2 && userType == "company" && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>שם החברה/החשבון</h3>
                            <input
                                name='companyName'
                                value={form.companyName}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="לדוגמה, שם החברה או המחלקה"
                            />
                            <h3 className='mb-1'>מספר עסק/מזהה החברה</h3>
                            <input
                                type='number'
                                name='companyId'
                                value={form.companyId}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="לדוגמה, מזהה העסק של החברה"
                            />
                            <h3 className='mb-1'>מספר טלפון של החברה</h3>
                            <input
                                name='phoneNumber'
                                value={form.phoneNumber}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="לדוגמה, מספר הטלפון של החברה"
                            />

                            <div className='flex justify-center items-center'>
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>קודם</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlesteptwo}>הבא</button>
                            </div>
                            <p className='text-center mt-5'>כבר יש לך חשבון? <span className='text-[#2676E5]'><Link to="/login">התחבר</Link></span></p>
                        </div>
                    )}
                    {count == 3 && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>מספר המשאיות</h3>
                            <div className='flex mb-1'>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '1-10' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="oneTruck"
                                        name="numberOfTrucks"
                                        value="1-10"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '1-10'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="oneTruck">1-10</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '11-50' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="twoTrucks"
                                        name="numberOfTrucks"
                                        value="11-50"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '11-50'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="twoTrucks">11-50</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '51-200' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="threeTrucks"
                                        name="numberOfTrucks"
                                        value="51-200"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '51-200'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="threeTrucks">51-200</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '200+' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="fourTrucks"
                                        name="numberOfTrucks"
                                        value="200+"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '200+'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="fourTrucks">200+</label>
                                </div>
                            </div>

                            <h3 className='mb-1'>באילו ערים אתה פועל?</h3>
                            <GoogleCityAutocomplete value={form.city} onChange={handleFormChange} name="city" placeholder="בחר עיר" />
                            <div className='flex justify-center items-center'>
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>קודם</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepthree}>הבא</button>
                            </div>
                            <p className='text-center mt-5'>כבר יש לך חשבון? <span className='text-[#2676E5]'><Link to="/login">התחבר</Link></span></p>
                        </div>
                    )}
                    {count == 4 && (
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
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>קודם</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepfour}>הרשם</button>
                            </div>
                            <div className='flex mt-5 justify-center items-center'>
                                <input
                                    type="checkbox"
                                    name="agreed"
                                    checked={form.agreed}
                                    onChange={handleCheckboxChange}
                                    className='mr-2'
                                />
                                <p>ממשיך, אתה מסכים ל</p>
                            </div>
                            <p className='text-center'><span className='text-[#2676E5]'>תנאי השימוש</span> ו-<span className='text-[#2676E5]'>מדיניות הפרטיות</span></p>
                            <p className='text-center mt-5'>כבר יש לך חשבון? <span className='text-[#2676E5]'><Link to="/login">התחבר</Link></span></p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Register;
