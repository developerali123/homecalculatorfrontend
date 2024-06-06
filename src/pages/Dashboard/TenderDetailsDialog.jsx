import React from "react";
import { couch, pin } from "../../assets";
const TenderDetailsDialog = ({ DialogData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>קטגוריה</th>
                    <th>תיאור</th>
                    <th>עלות</th>
                    <th>כמות</th>
                    <th>סכום כולל</th>
                </tr>
            </thead>
            <tbody>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}><img src={pin} alt="background" className='h-8 mr-5' />
                        <h2>מרחק</h2></td>
                </tr>
                <tr>
                    <td></td>
                    <td><h3>כתובת התחלה</h3><p>{DialogData[0]?.originaddress}</p></td>
                    <td>2 ש"ח</td>
                    <td>{DialogData[0]?.distance?.$numberDecimal}</td>
                    <td>{DialogData[0]?.distanceprice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr>
                    <td></td>
                    <td><h3>כתובת יעד</h3><p>{DialogData[0]?.destinationaddress}</p></td>
                    <td>2 ש"ח</td>
                    <td>{DialogData[0]?.distance?.$numberDecimal}</td>
                    <td>{DialogData[0]?.distanceprice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr className='bg-[#E4E4EF]'>
                    <td colSpan={5}>
                        <img src={pin} alt="background" className='h-8 mr-5' />
                        <h2>קומות</h2>
                    </td>
                </tr>
                <tr>
                    <td><p>חישוב ב-10% עבור כל קומה,</p><p>מעלות מהעלות של כל פריט</p></td>
                    <td><p>{DialogData[0]?.originaddress}</p><h3>קומה {DialogData[0]?.originfloor}</h3></td>
                    <td>10%</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}ש"ח</td>
                    <td>{DialogData[0]?.originfloorprice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr>
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>קומה {DialogData[0]?.destinationfloor}</h3></td>
                    <td>2 ש"ח</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}ש"ח</td>
                    <td>{DialogData[0]?.destinationfloorprice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={pin} alt="background" className='h-8 mr-5' />
                        <h2>נגישות</h2>
                    </td>
                </tr>
                <tr>
                    <td><p>חישוב ב-10% עבור כל רמה,</p><p>מעלות מהעלות של כל פריט</p></td>
                    <td><p>{DialogData[0]?.originaddress}</p><h3>{DialogData[0]?.origintruckAccess}</h3></td>
                    <td>10%</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}ש"ח</td>
                    <td>{DialogData[0]?.origintruckaccessprice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr>
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>{DialogData[0]?.destinationtruckAccess}</h3></td>
                    <td>2 ש"ח</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}ש"ח</td>
                    <td>{DialogData[0]?.destinationtruckaccessprice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>פריטים</h2>
                    </td>
                </tr>
                {DialogData[0]?.items.map((item, index) => (
                    <tr key={index} className=" bg-gray-100 p-2">
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.price}ש"ח</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}ש"ח</td>
                    </tr>
                ))}
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>פירוק</h2>
                    </td>
                </tr>
                {DialogData[0]?.disassembledItems.map((item, index) => (
                    <tr key={index} className="  bg-gray-100  p-2">
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.price}ש"ח</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}ש"ח</td>
                    </tr>
                ))}
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>הרכבה</h2>
                    </td>
                </tr>
                {DialogData[0]?.assembledItems.map((item, index) => (
                    <tr key={index} className="  bg-gray-100  p-2">
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.price}ש"ח</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}ש"ח</td>
                    </tr>
                ))}
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>קופסאות</h2>
                    </td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td>אספקת קופסאות</td>
                    <td>5 ש"ח</td>
                    <td>{DialogData[0]?.boxes}</td>
                    <td>{DialogData[0]?.boxesPrice?.$numberDecimal}ש"ח</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>מנוף</h2>
                    </td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td><p>{DialogData[0]?.originaddress}</p><h3>קומה {DialogData[0]?.originfloor}</h3></td>
                    <td>100ש"ח</td>
                    <td>{DialogData[0]?.originCranePrice?.$numberDecimal}ש"ח</td>
                    <td>{DialogData[0]?.originCranePrice?.$numberDecimal * 100}ש"ח</td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>קומה {DialogData[0]?.destinationfloor}</h3></td>
                    <td>10 ש"ח</td>
                    <td>{DialogData[0]?.destinationCranePrice?.$numberDecimal}ש"ח</td>
                    <td>{DialogData[0]?.destinationCranePrice?.$numberDecimal * 100}ש"ח</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>אריזה</h2>
                    </td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>קומה {DialogData[0]?.destinationfloor}</h3></td>
                    <td>10%</td>
                    <td>{DialogData[0]?.items.length}</td>
                    <td>{DialogData[0]?.packingprice?.$numberDecimal}ש"ח</td>
                </tr>
            </tbody>
        </table>

    );
};

export default TenderDetailsDialog;