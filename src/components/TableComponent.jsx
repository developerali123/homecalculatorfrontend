import React from 'react';
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { pin, couch } from '../assets';

const TableComponent = () => {
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
    const price = useSelector(state => Math.round(state.items.totalPrice));;
    return (
        <div className='bg-white p-20'>
            <h2 className='text-center mb-5 font-bold text-xl'>עלות כוללת: {price}</h2>
            <table className='border border-black'>
                <thead>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <th>קטגוריה</th>
                        <th>תיאור</th>
                        <th>עלות</th>
                        <th>כמות</th>
                        <th>עלות כוללת</th>
                        <th>עריכה</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}><img src={pin} alt="background" className='h-8 mr-5' />
                            <h2>מרחק</h2></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><h3>כתובת התחלה</h3><p>{baselineForm.originaddress}</p></td>
                        <td>2 ש"ח</td>
                        <td>{distance}</td>
                        <td>{distanceprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><h3>כתובת יעד</h3><p>{baselineForm.destinationaddress}</p></td>
                        <td>2 ש"ח</td>
                        <td>{distance}</td>
                        <td>{distanceprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF] border border-black'>
                        <td colSpan={6}>
                            <img src={pin} alt="background" className='h-8 mr-5' />
                            <h2>קומות</h2>
                        </td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td><p>חישוב בשיעור של 10% לכל קומה,</p><p>מעלותו של כל פריט</p></td>
                        <td><p>{baselineForm.originaddress}</p><h3>קומה {baselineForm.originfloor}</h3></td>
                        <td>10%</td>
                        <td>{itemsprice}ש"ח</td>
                        <td>{originfloorprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>קומה {baselineForm.destinationfloor}</h3></td>
                        <td>2 ש"ח</td>
                        <td>{itemsprice}ש"ח</td>
                        <td>{destinationfloorprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={pin} alt="background" className='h-8 mr-5' />
                            <h2>נגישות</h2>
                        </td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td><p>חישוב בשיעור של 10% לכל רמה,</p><p>מעלותו של כל פריט</p></td>
                        <td><p>{baselineForm.originaddress}</p><h3>{baselineForm.origintruckAccess}</h3></td>
                        <td>10%</td>
                        <td>{itemsprice}ש"ח</td>
                        <td>{origintruckaccessprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>{baselineForm.destinationtruckAccess}</h3></td>
                        <td>2 ש"ח</td>
                        <td>{itemsprice}ש"ח</td>
                        <td>{destinationtruckaccessprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>פריטים</h2>
                        </td>
                    </tr>
                    {items.map((item, index) => (
                        <tr key={index} className=" bg-gray-100 p-2 border border-black">
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.price}ש"ח</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}ש"ח</td>
                            <td><MdEdit className='text-blue-900' /></td>
                        </tr>
                    ))}
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>פירוק</h2>
                        </td>
                    </tr>
                    {disassembledItems.map((item, index) => (
                        <tr key={index} className="  bg-gray-100  p-2 border border-black">
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.price}ש"ח</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}ש"ח</td>
                            <td><MdEdit className='text-blue-900' /></td>
                        </tr>
                    ))}
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>הרכבה</h2>
                        </td>
                    </tr>
                    {assembledItems.map((item, index) => (
                        <tr key={index} className="  bg-gray-100  p-2 border border-black">
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.price}ש"ח</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}ש"ח</td>
                            <td><MdEdit className='text-blue-900' /></td>
                        </tr>
                    ))}
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>קרטונים</h2>
                        </td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td>ספק קרטונים</td>
                        <td>5 ש"ח</td>
                        <td>{boxes}</td>
                        <td>{boxesPrice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>מנוף</h2>
                        </td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td><p>{baselineForm.originaddress}</p><h3>קומה {baselineForm.originfloor}</h3></td>
                        <td>100ש"ח</td>
                        <td>{originCranePrice}ש"ח</td>
                        <td>{originCranePrice * 100}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>קומה {baselineForm.destinationfloor}</h3></td>
                        <td>10 ש"ח</td>
                        <td>{destinationCranePrice}ש"ח</td>
                        <td>{destinationCranePrice * 100}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>אריזה</h2>
                        </td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>קומה {baselineForm.destinationfloor}</h3></td>
                        <td>10%</td>
                        <td>{items.length}</td>
                        <td>{packingprice}ש"ח</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default TableComponent