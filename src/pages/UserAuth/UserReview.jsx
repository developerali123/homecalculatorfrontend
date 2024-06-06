import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegUserCircle, FaBell, FaTimes } from 'react-icons/fa';
import { CiStar } from "react-icons/ci";
import TruckBtn from '../../components/TruckBtn';
import { useAuth } from '../../AuthProvider';
import Confetti from "react-confetti";
import { greenarrow } from "../../assets";
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../slices/slices';
import { clearTenderId } from '../../slices/tenderslice';
import { clearCompanyId } from '../../slices/companyslice';

const UserReview = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const [userId, setuserId] = useState(auth?.user);
    const companyId = useSelector(state => state.company.companyId)
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [name, setname] = useState("");

    const fetchuserdata = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/users/${userId}`);
            setname(response?.data?.user?.name);
            console.log(response?.data?.user?.name);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchuserdata();
    }, [userId]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [form, setForm] = useState({
        userId: userId,
        companyId: companyId,
        ratings: {
            rating1: 0,
            rating2: 0,
            rating3: 0,
            rating4: 0,
            rating5: 0,
            rating6: 0,
            rating7: 0
        },
        comments: {
            comment1: "",
            comment2: "",
            comment3: "",
            comment4: "",
            comment5: "",
            comment6: "",
            comment7: ""
        },
        additionalDetails: ""
    });

    const handleRatingChange = (rating, questionNumber) => {
        setForm(prevForm => ({
            ...prevForm,
            ratings: {
                ...prevForm.ratings,
                [`rating${questionNumber}`]: rating
            }
        }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('comment')) {
            setForm(prevForm => ({
                ...prevForm,
                comments: {
                    ...prevForm.comments,
                    [name]: value
                }
            }));
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/company/reviews', form);
            toast.success('סקירה נשלחה בהצלחה!');
            setTimeout(() => {
                setFormSubmitted(true);
                dispatch(clearTenderId());
                dispatch(clearCompanyId());
                dispatch(resetState());
                auth.logOut();
            }, 3000);

        } catch (error) {
            toast.error('נכשל בהגשת ביקורת!');
            console.error(error);
        }
    };

    if (formSubmitted) {
        return (
            <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-grey-500">
                <div
                    id="confetti-container"
                    className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center"
                >
                    <קונפטי
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                </div>
                <div className="absolute top-0 flex flex-col items-center z-20">
                    <img
                        src={greenarrow}
                        alt="חץ ירוק"
                        className="w-20 h-20 mb-4 mt-20"
                    />
                    <p className="text-white text-4xl font-bold my-4 ">
                        תודה!
                    </p>
                    <p className="text-white text-xl text-center mb-4">
                        מקווה לראות אותך שוב
                        <br />
                        אנו עובדים קשה כדי למצוא לך את ההצעות הטובות ביותר. את ההצעות תקבלו ישירות לוואטסאפ, ותוכלו לבחור את ההצעה הטובה ביותר עבורכם.
                    </p>
                    כפתור
                    <button
                        onClick={() => setFormSubmitted(false)}
                        className="absolute top-20 right-1"
                    >
                        <FaTimes className="text-white text-2xl cursor-pointer" />
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-white h-max-screen">
                <div className="bg-[#96E0F8] flex justify-between py-3">
                    <div>
                        <h2 className='w-full text-xl bm-font'>לחץ <span className='text-orange-500 px-2'>n</span>Move</h2>
                    </div>
                    <div className="flex">
                        <FaBell className="mr-3" size={20} />
                        <FaRegUserCircle className="mr-3" size={20} />
                    </div>
                </div>
                <div className="py-2 flex justify-between border-b border-black mb-3" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    {/* <h1>Welcome! {auth.user?.username}</h1> */}
                    <div className='ml-3'>
                        <h2>צהריים טובים, {name}</h2>
                        <h2>גש מהר למכרזים שלך</h2>
                    </div>
                    <button onClick={() => auth.logOut()} className="btn-submit">
                        התנתק
                    </button>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <div className=' bg-[#96E0F8] p-5 rounded-md md:w-[700px] w-[300px] mb-5'>
                        <p className='mb-5 text-center md:w-full w-[250px]'>!תודה שהשתמשת בשירותי Click n' Move! אנחנו נשמח לשמוע על חווייתך איתנו. המשוב שלך יעזור לנו לשפר את השירותים שלנו ולהפוך אותם לטוב יותר</p>

                        <p className='text-center md:w-full w-[250px]'>!הסקר יקח עד 5 דקות. אנא ענה על כל השאלות בכנות</p>
                        <div className='flex justify-center items-center flex-col'>
                            <div className='my-3 md:w-full w-[250px]'>
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>1. דרג את חווייתך עם מחשבון Click n Move</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 1)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating1) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment1'
                                    value={form.comment1}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>2. דרג את חוויית ניהול המכרז</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 2)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating2) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment2'
                                    value={form.comment2}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>3. דרג את רמת המקצועיות של חברת הובלות</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 3)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating3) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment3'
                                    value={form.comment3}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>4. דרג את השביעות רצונך מאוחריות החברה להובלה</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 4)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating4) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment4'
                                    value={form.comment4}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>5. דרג את השביעות רצונך מהטיפול שקיבלת מחברת ההובלה</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 5)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating5) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment5'
                                    value={form.comment5}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>6. דרג את השביעות רצונך מהמחיר שקיבלת מחברת ההובלה</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 6)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating6) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment6'
                                    value={form.comment6}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm md:w-full w-[200px]'>7. דרג את השביעות רצונך מאיכות השירות שקיבלת</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 7)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating7) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף הערה</h3>
                                <input
                                    name='comment7'
                                    value={form.comment7}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                />
                                <h3 className='mb-1 mt-5 md:text-xl text-sm md:w-full w-[200px]'>הוסף פרטים נוספים</h3>
                                <textarea
                                    name='additionalDetails'
                                    value={form.additionalDetails}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להזין תגובה כאן"
                                    rows="3"
                                />
                                <TruckBtn onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserReview;
