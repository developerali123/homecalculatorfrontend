import React, { useState } from 'react'
import Sidediv from '../Auth/Sidediv'
import { useAuth } from '../../AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setTenderId } from '../../slices/tenderslice';

const TenderForm = () => {
  const dispatch = useDispatch();
  const user = useAuth();
  const userId = user?.user;
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const price = useSelector(state => Math.round(state.items.totalPrice));;
  const baselineForm = useSelector(state => state.items.baseline);
  const distance = useSelector(state => state.items.distanceInKm);
  const distanceprice = useSelector(state => state.items.distancePrice);
  const originfloorprice = useSelector(state => state.items.originfloorprice);
  const destinationfloorprice = useSelector(state => state.items.destinationfloorprice);
  const origintruckaccessprice = useSelector(state => state.items.origintruckaccessprice);
  const destinationtruckaccessprice = useSelector(state => state.items.destinationtruckaccessprice);
  const itemsprice = useSelector(state => state.items.itemsPrice);
  const items = useSelector(state => state.items.items);
  const assembledItems = useSelector(state => state.items.assembledItems);
  const disassembledItems = useSelector(state => state.items.disassembledItems);
  const boxesPrice = useSelector(state => state.items.boxesPrice);
  const boxes = useSelector(state => state.items.boxes);
  const originCranePrice = useSelector(state => state.items.originCranePrice);
  const destinationCranePrice = useSelector(state => state.items.destinationCranePrice);
  const packingprice = useSelector(state => state.items.packingprice);
  const [form, setForm] = useState({
    phonenumber: "",
    name: "",
    starthours: "",
    endhours: "",
    transportdate: "",
    arrivaldate: "",
    additionalDetails: "",
    movingPrice: price,
    originaddress: baselineForm.originaddress,
    destinationaddress: baselineForm.destinationaddress,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim() === "") {
      toast.error('נא למלא שם מלא');
      return;
    }
    if (form.phonenumber.trim() === "") {
      toast.error('נא למלא מספר טלפון');
      return;
    }
    if (form.transportdate.trim() === "") {
      toast.error('אנא בחר את תאריך ההובלה');
      return;
    }
    if (form.arrivaldate.trim() === "") {
      toast.error('אנא בחר את תאריך ההגעה');
      return;
    }
    if (form.starthours.trim() === "") {
      toast.error('אנא בחר את שעות ההתחלה');
      return;
    }
    if (form.endhours.trim() === "") {
      toast.error('אנא בחר את שעות הסיום');
      return;
    }
    if (form.additionalDetails.trim() === "") {
      toast.error('אנא ספק פרטים נוספים');
      return;
    }
    try {
      const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/tenders/sendtender', {
        userId,
        name: form.name,
        phonenumber: form.phonenumber,
        additionalDetails: form.additionalDetails,
        movingPrice: form.movingPrice,
        originaddress: form.originaddress,
        destinationaddress: form.destinationaddress,
        transportdate: form.transportdate,
        arrivaldate: form.arrivaldate,
        starthours: form.starthours,
        endhours: form.endhours,
      });
      await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/tenders/tenderdetails', {
        tenderId: response?.data?.tenderId,
        originaddress: baselineForm.originaddress,
        distance: distance,
        distanceprice: distanceprice,
        destinationaddress: baselineForm.destinationaddress,
        originfloor: baselineForm.originfloor,
        itemsprice: itemsprice,
        originfloorprice: originfloorprice,
        destinationfloor: baselineForm.destinationfloor,
        destinationfloorprice: destinationfloorprice,
        origintruckAccess: baselineForm.origintruckAccess,
        origintruckaccessprice: origintruckaccessprice,
        destinationtruckAccess: baselineForm.destinationtruckAccess,
        destinationtruckaccessprice: destinationtruckaccessprice,
        items: items,
        assembledItems: assembledItems,
        disassembledItems: disassembledItems,
        boxes: boxes,
        boxesPrice: boxesPrice,
        originCranePrice: originCranePrice,
        destinationCranePrice: destinationCranePrice,
        packingprice: packingprice,
      });
      dispatch(setTenderId(response?.data?.tenderId));
      toast.success("מכרז נוצר בהצלחה")
      navigate(`/userdashboard`);
      setFormSubmitted(true);
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
          <h1 className="text-2xl mb-2 align-center">
            מעוניינים במכרז?
          </h1>
          <h2 className="text-md p-4 text-slate-500 text-center">
            הרשימו לנו לעשות את העבודה הקשה עבורכם.
            <br />
            תנו פרטים, ואנחנו נדאג לאיתור לכם
            את ההצעה הטובה ביותר!
          </h2>

          <h3 className="text-md my-4 text-slate-400">
            נא לשים לב - גמישות בתאריכי המשלוח והגעה עשויה
            לעזור לך לקבל הצעות טובות יותר.
          </h3>
          <div className='flex flex-col'>
            <div className='flex '>
              <div className='mr-3'>
                <h3 className='mb-1'>שם מלא</h3>
                <input
                  name='name'
                  value={form.name}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="הזן את שמך המלא"
                />
              </div>
              <div>
                <h3 className='mb-1'>מספר טלפון</h3>
                <input
                  name='phonenumber'
                  value={form.phonenumber}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="הזן את מספר הטלפון שלך"
                />
              </div>
            </div>
            <div className='flex '>
              <div className='mr-3'>
                <h3 className='mb-1'>תאריך הובלה</h3>
                <input
                  type='date'
                  name='transportdate'
                  value={form.transportdate}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="הזן את מספר הטלפון שלך"
                />
              </div>
              <div>
                <h3 className='mb-1'>תאריך הגעה</h3>
                <input
                  type='date'
                  name='arrivaldate'
                  value={form.arrivaldate}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="הזן את מספר הטלפון שלך"
                />
              </div>
            </div>
            <div className='flex '>
              <div className='mr-3'>
                <h3 className='mb-1'>שעת התחלה</h3>
                <input
                  type='time'
                  name='starthours'
                  value={form.starthours}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="הזן את מספר הטלפון שלך"
                />
              </div>
              <div>
                <h3 className='mb-1'>שעת סיום</h3>
                <input
                  type='time'
                  name='endhours'
                  value={form.endhours}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="הזן את מספר הטלפון שלך"
                />
              </div>
            </div>
            <h3 className='mb-1'>פרטים נוספים</h3>
            <textarea
              name='additionalDetails'
              value={form.additionalDetails}
              onChange={handleFormChange}
              className='w-[410px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
              placeholder="הזן פרטים נוספים"
              rows="3"
            />
            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleSubmit}>צור מכרז</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default TenderForm