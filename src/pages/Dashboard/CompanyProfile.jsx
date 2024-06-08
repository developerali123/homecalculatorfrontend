import React, { useEffect, useState } from 'react'
import { CiStar } from 'react-icons/ci'
import { FaBell, FaRegUserCircle } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { useAuth } from '../../AuthProvider'
import axios from "axios";
import GoogleCityAutocomplete from '../../components/GeogleCityAutocomplete'
import { useJsApiLoader } from '@react-google-maps/api'
import { toast } from 'react-toastify';

const CompanyProfile = () => {
    const auth = useAuth();
    const [userId, setuserId] = useState(auth?.user);
    const [form, setForm] = useState({
        fullName: "",
        confirmpassword: "",
        companyName: "",
        numberOfTrucks: "1-10",
        phoneNumber: "",
        city: "Tel aviv",
        companyId: null
    });
    const [isEditable, setIsEditable] = useState(false);
    const [name, setname] = useState("");
    const [rating, setrating] = useState("");
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAuIchE5mdfEw_S7oM8I5ZkpCcQyWOMg-Y',
        libraries: ['places']
    })

    const fetchuserdata = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/users/${userId}`);
            const rating = parseFloat(response?.data?.companies[0]?.rating).toFixed(1);
            setname(response?.data?.companies[0]?.companyName);
            setrating(rating);
            setForm({
                companyName: response?.data?.companies[0]?.companyName,
                fullName: response?.data?.user?.name,
                phoneNumber: response?.data?.companies[0]?.phoneNumber,
                companyId: response?.data?.companies[0]?.companyId,
                numberOfTrucks: response?.data?.companies[0]?.numberOfTrucks,
                city: response?.data?.companies[0]?.city
            });
            console.log(response?.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchuserdata();
    }, [userId]);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };
    const handlesave = async () => {
        const url = `https://homecalculatorbackend-ni04.onrender.com/api/company/updateProfile/${userId}`;
        const payload = {
            userData: {
                fullName: form.fullName
            },
            companyData: {
                companyName: form.companyName,
                numberOfTrucks: form.numberOfTrucks,
                phoneNumber: form.phoneNumber,
                city: form.city,
                companyId: form.companyId
            }
        };
        try {
            const response = await axios.put(url, payload);
            if (response.status === 200) {
                setIsEditable(false); // Disable edit mode if the save is successful
                toast.success('Profile updated successfully!');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            toast.error('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="bg-white h-full">
            <div className="bg-[#96E0F8] flex justify-between py-3">
                <div>
                    <h2 className='w-full text-xl bm-font'>Click <span className='text-orange-500 px-2'>n</span>Move</h2>
                </div>
                <div className="flex">
                    <FaBell className="mr-3" size={20} />
                    <FaRegUserCircle className="mr-3" size={20} />
                </div>
            </div>
            <div className="py-1 ml-3 flex justify-between">
                <div>
                    <h2>Good afternoon, {name}!</h2>
                    <h2>Quickly access Your tenders</h2>
                </div>
                <button onClick={() => auth.logOut()} className="btn-submit">
                    logout
                </button>
            </div>
            <div className='grid grid-cols-12'>
                <div className='md:col-span-6 col-span-12'>
                    <div className='flex flex-col justify-center items-center'>
                        <FaCircleUser size={100} className='mt-10' />
                        <h1 className='mt-10'>{name}</h1>
                        <h2>User name</h2>
                        <div className='flex mt-10'>
                            <div className='border-r border-black p-2 flex flex-col justify-center items-center'>
                                <CiStar
                                    size={30}
                                    className='mr-2'
                                    style={{ color: 'gold' }}
                                />
                                <p>{rating} ratings</p>
                            </div>
                            <div className='border-r border-black p-2 flex flex-col justify-center items-center'>
                                <h2>21</h2>
                                <p>Active offers</p>
                            </div>
                            <div className='border-r border-black p-2 flex flex-col justify-center items-center'>
                                <h2>238</h2>
                                <p>Completed moves</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-6 col-span-12 mb-5">
                    <div className='flex justify-end items-center'>
                        <button className='bg-white text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={toggleEditMode}>
                            {isEditable ? 'Cancel' : 'Edit'}
                        </button>
                        <button className='bg-[#2676E5] text-white p-2 mt-5 rounded-md mr-2' disabled={!isEditable} onClick={() => { handlesave() }}>
                            Save
                        </button>
                    </div>
                    <h3 className='mb-1'>UserName</h3>
                    <input
                        name='fullName'
                        value={form.fullName}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                        disabled={!isEditable}
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Company Name</h3>
                    <input
                        name='companyName'
                        value={form.companyName}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                        disabled={!isEditable}
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Phone Number</h3>
                    <input
                        name='phoneNumber'
                        value={form.phoneNumber}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                        disabled={!isEditable}
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Company ID</h3>
                    <input
                        name='companyId'
                        value={form.companyId}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                        disabled={!isEditable}
                    />
                    <hr />
                    {/* <h3 className='mb-1 mt-5'>Address</h3>
                    <textarea
                        name='additionalDetails'
                        value={form.additionalDetails}
                        onChange={handleFormChange}
                        className='w-full bg-white   py-2 rounded-md  mb-1'
                        placeholder="You can type your comment here"
                    /> */}
                    <hr />
                    <h3 className='mb-1 mt-5'>Number of Trucks</h3>
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
                                disabled={!isEditable}
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
                                disabled={!isEditable}
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
                                disabled={!isEditable}
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
                                disabled={!isEditable}
                            />
                            <label htmlFor="fourTrucks">200+</label>
                        </div>
                    </div>
                    <hr />
                    <h3 className='mb-1'>In which cities do you operate?</h3>
                    {isLoaded ? (
                        <GoogleCityAutocomplete value={form.city} onChange={handleFormChange} name="city" placeholder="Select city" disabled={!isEditable} />
                    ) : (
                        <div>Loading Maps...</div> // Or any other placeholder content
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile