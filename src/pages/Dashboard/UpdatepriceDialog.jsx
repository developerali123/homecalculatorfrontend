import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthProvider';
import axios from "axios";

const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
}


const UpdatePriceDialog = ({ DialogData, onCloseAndRefetch }) => {
    const user = useAuth();
    const userId = user?.user;
    const tenderId = DialogData?.id;

    const [field, setField] = useState({
        price: '',
        transportdate: '',
        arrivaldate: '',
        starthours: '',
        endhours: ''
    });

    useEffect(() => {
        if (DialogData) {
            setField({
                price: DialogData?.priceOffer || '',
                transportdate: DialogData?.transportdate ? formatDate(DialogData.transportdate) : '',
                arrivaldate: DialogData?.arrivaldate ? formatDate(DialogData.arrivaldate) : '',
                starthours: DialogData?.starttime || '',
                endhours: DialogData?.endtime || ''
            });
        }
    }, [DialogData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField(prevField => ({ ...prevField, [name]: value }));
    };

    const handleApply = async () => {
        if (!field.price || !field.transportdate || !field.arrivaldate || !field.starthours || !field.endhours) {
            toast.error('כל השדות נדרשים');
            return;
        }

        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/priceoffer/updateoffer', {
                userId,
                tenderId,
                priceOffer: field.price,
                transportdate: field.transportdate,
                arrivaldate: field.arrivaldate,
                starthours: field.starthours,
                endhours: field.endhours,
            });

            toast.success('ההצעה עודכנה בהצלחה');
            onCloseAndRefetch();
        } catch (error) {
            toast.error('נכשל בעדכון ההצעה');
        }
    };

    return (
        <div>
            <div className='flex justify-between mb-2'>
                <p>מזהה מכרז:{DialogData?.id}</p>
                <p>הצעת המחיר הטובה ביותר נוכחית:{DialogData?.bestOffer}</p>
            </div>
            <hr />
            <form>
                <div className='flex'>
                    <div className='mr-3'>
                        <label htmlFor="price" className="block mb-1">מחיר</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full border rounded p-1"
                            value={field.price}
                            onChange={handleChange}
                            placeholder="מחיר"
                        />
                    </div>
                    <div className='mr-3'>
                        <label htmlFor="starthours" className="block mb-1">שעת התחלה</label>
                        <input
                            type="time"
                            name="starthours"
                            className="w-full border rounded p-1"
                            value={field.starthours}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mr-3'>
                        <label htmlFor="endhours" className="block mb-1">שעת סיום</label>
                        <input
                            type="time"
                            name="endhours"
                            className="w-full border rounded p-1"
                            value={field.endhours}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className='mr-3'>
                        <label htmlFor="transportdate" className="block mb-1">תאריך הובלה</label>
                        <input
                            type="date"
                            name="transportdate"
                            className="w-full border rounded p-1"
                            value={field.transportdate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mr-3'>
                        <label htmlFor="arrivaldate" className="block mb-1">תאריך הגעה</label>
                        <input
                            type="date"
                            name="arrivaldate"
                            className="w-full border rounded p-1"
                            value={field.arrivaldate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
            <div className='mt-3'>
                <button className="bg-orange-400 rounded-lg p-3 text-white" onClick={handleApply}>הגש</button>
            </div>
        </div>

    )
}

export default UpdatePriceDialog;
