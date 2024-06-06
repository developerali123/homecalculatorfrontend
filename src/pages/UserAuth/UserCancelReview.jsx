import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Confetti from "react-confetti";
import { CiStar } from "react-icons/ci";
import { FaBell, FaRegUserCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthProvider';
import { greenarrow } from "../../assets";
import TruckBtn from '../../components/TruckBtn';
import { clearTenderId } from '../../slices/tenderslice';
import { resetState } from '../../slices/slices';
import { useDispatch } from 'react-redux';

const UserCancelReview = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const [userId, setuserId] = useState(auth?.user);
    const [selectedCheckboxes1, setselectedCheckboxes1] = useState([]);
    const [selectedCheckboxes2, setselectedCheckboxes2] = useState([]);
    const [selectedCheckboxes3, setselectedCheckboxes3] = useState([]);
    const [name, setname] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
        tender_cancel: [],
        auction_experience: [],
        tender_service: [],
        ratings: {
            rating1: 0,
        },
        comments: {
            comment1: "",
            comment2: ""
        },
    });

    useEffect(() => {
        setForm(prevForm => ({
            ...prevForm, tender_cancel: selectedCheckboxes1, auction_experience: selectedCheckboxes2, tender_service: selectedCheckboxes3
        }))
    }, [selectedCheckboxes1, selectedCheckboxes2, selectedCheckboxes3])

    const handleRatingChange = (rating, questionNumber) => {
        setForm(prevForm => ({
            ...prevForm,
            ratings: {
                ...prevForm.ratings,
                [`rating${questionNumber}`]: rating
            }
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value, checked, name } = event.target;
        if (name === "checkbox1" && checked) {
            setselectedCheckboxes1(prev => [...prev, value]);
        } else if (name == "checkbox1" && !checked) {
            setselectedCheckboxes1(prev => prev.filter(item => item !== value));
        }
        if (name === "checkbox2" && checked) {
            setselectedCheckboxes2(prev => [...prev, value]);
        } else if (name == "checkbox2" && !checked) {
            setselectedCheckboxes2(prev => prev.filter(item => item !== value));
        }
        if (name === "checkbox3" && checked) {
            setselectedCheckboxes3(prev => [...prev, value]);
        } else if (name == "checkbox3" && !checked) {
            setselectedCheckboxes3(prev => prev.filter(item => item !== value));
        }
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
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/reviews', form);
            toast.success('סקירה נשלחה בהצלחה!');
            setTimeout(() => {
                setFormSubmitted(true);
                dispatch(clearTenderId());
                dispatch(resetState());
                auth.logOut();
            }, 3000);
        } catch (error) {
            toast.error('נכשל בהגשת ביקורת!');
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
                        <h2>גישה מהירה למכרזים שלך</h2>
                    </div>
                    <button onClick={() => auth.logOut()} className="btn-submit">
                        התנתק
                    </button>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <div className=' bg-[#96E0F8] p-5 rounded-md md:w-[700px] w-[300px] mb-5'>
                        <p className='mb-5'>שלום {name},</p>
                        <p className='mb-5'>רצינו להודות לך על הזמן שהקדשת להשתתף במכרז למציאת חברת ניהול דירות עבורך. אנו מצטערים לשמוע שבחרת לבטל את המכרז בזמן זה.</p>

                        <p className='mb-5'>נשמח מאוד לשמוע ממך את הסיבה לביטול המכרז. משובך חשוב לנו ויכול לעזור לנו לשפר את השירותים שלנו בעתיד.</p>

                        <p className='mb-5'>אנא הקדש כמה דקות למילוי סקר קצר זה, בו תוכל לספר לנו על חווייתך בתהליך המכרז. התשובות שלך יהיו לגמרי אנונימיות.</p>
                        <div className='flex justify-center items-center flex-col'>
                            <div className='my-3 md:w-full w-[250px]'>
                                <h3 className='my-2 md:text-xl text-sm'>1.אילו גורמים השפיעו על החלטתך לבטל את המכרז?</h3>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="לא מרוצה מהתוצאה שקיבלתי מהמחשבון"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("לא מרוצה מהתוצאה שקיבלתי מהמחשבון")}
                                            className='mr-2'
                                        />
                                        לא מרוצה מהתוצאה שקיבלתי מהמחשבון
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="חברות הובלה נתנו מחירים גבוהים יותר מהנראה במחשבון"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("חברות הובלה נתנו מחירים גבוהים יותר מהנראה במחשבון")}
                                            className='mr-2'
                                        />
                                        חברות הובלה נתנו מחירים גבוהים יותר מהנראה במחשבון
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="מצאתי חברת הובלה אחרת במחיר זול יותר"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("מצאתי חברת הובלה אחרת במחיר זול יותר")}
                                            className='mr-2'
                                        />
                                        מצאתי חברת הובלה אחרת במחיר זול יותר
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="התהליך ארוך וכבד מדי"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("התהליך ארוך וכבד מדי")}
                                            className='mr-2'
                                        />
                                        התהליך ארוך וכבד מדי
                                    </label>
                                </div>
                                <h3 className='mb-1'>סיבה אחרת (אנא פרטו).</h3>
                                <input
                                    name='comment1'
                                    value={form.comment1}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להקליד את ההערה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm'>2.מה דעתך יכולה לשפר את חוויית המכרז עבורך?</h3>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="קבלת מידע מפורט יותר על החברות שהשתתפו במכרז"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("קבלת מידע מפורט יותר על החברות שהשתתפו במכרז")}
                                            className='mr-2'
                                        />
                                        קבלת מידע מפורט יותר על החברות שהשתתפו במכרז
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="תהליך פשוט ומהיר יותר"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("תהליך פשוט ומהיר יותר")}
                                            className='mr-2'
                                        />
                                        תהליך פשוט ומהיר יותר
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="אפשרות לקבל המלצות מחברות אחרות"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("אפשרות לקבל המלצות מחברות אחרות")}
                                            className='mr-2'
                                        />
                                        אפשרות לקבל המלצות מחברות אחרות
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="תמיכה מקצועית לאורך התהליך"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("תמיכה מקצועית לאורך התהליך")}
                                            className='mr-2'
                                        />
                                        תמיכה מקצועית לאורך התהליך
                                    </label>
                                </div>
                                <h3 className='mb-1 mt-5'>סיבה אחרת (אנא פרטו).</h3>
                                <input
                                    name='comment2'
                                    value={form.comment2}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="ניתן להקליד את ההערה כאן"
                                />
                                <h3 className='my-2 md:text-xl text-sm'>3.שעור השביעות שלך משימוש בשירותי Click n Move</h3>
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
                                <h3 className='my-2 md:text-xl text-sm'>4.האם היית מוכן להשתמש בשירות המכרז למציאת חברת הובלה בעתיד?</h3>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox3"
                                            value="כן, בהחלט."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes3.includes("כן, בהחלט.")}
                                            className='mr-2'
                                        />
                                        כן, בהחלט.
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox3"
                                            value="אולי, בהתאם לתהליך והחברות שיצורפו למכרז."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes3.includes("אולי, בהתאם לתהליך והחברות שיצורפו למכרז.")}
                                            className='mr-2'
                                        />
                                        אולי, בהתאם לתהליך והחברות שיצורפו למכרז.
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox3"
                                            value="לא, אני מעדיף למצוא חברת הובלה בדרך אחרת."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes3.includes("לא, אני מעדיף למצוא חברת הובלה בדרך אחרת.")}
                                            className='mr-2'
                                        />
                                        לא, אני מעדיף למצוא חברת הובלה בדרך אחרת.
                                    </label>
                                </div>
                                <TruckBtn onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserCancelReview;
