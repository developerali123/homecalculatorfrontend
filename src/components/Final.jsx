import React from 'react'
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";
import { sum1, sum2, sum3, sum4, sum5, arrow1 } from '../assets';



const Final = () => {
  const price = useSelector(state => Math.round(state.items.totalPrice));;
  const distanceInKm=useSelector(state=>state.items.distanceInKm);

  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-10'>
      <div className='py-5 text-3xl font-semibold'>עלות כוללת </div>
      <div className='md:text-7xl text-3xl font-semibold'>{price} ש"ח</div>

      {/* תיבת אפור נקודותית */}
      <div className="mt-6 p-4 max-w-2xl w-1/2 flex flex-col items-center text-center">
        <h3 className='flex items-center gap-1'>
          <span><FaHeart className='text-red-600' /></span>
          שימו לב
        </h3>
        <h2>המחיר שמוצג הוא רק התחלה!</h2>
      </div>

      <h4 className='underline  text-center md:w-full w-[300px]'> חסכו עד 30% על ידי יצירת כרטיס בקשת מחיר בין חברות הובלה מובילות.</h4>
      <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap items-center justify-content mb-5">
        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum1} alt="sum1" />
          <p className='text-sm text-center'>בצעו את ההובלה והשאירו ביקורת על החוויה</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum2} alt="sum2" />
          <p className='text-sm text-center'>חברת הובלה יצרו איתכם קשר ותיארו את ההובלה איתכם</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum3} alt="sum3" />
          <p className='text-sm text-center'>בחרו את ההצעה הטובה ביותר עבורכם</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum4} alt="sum4" />
          <p className='text-sm text-center'>חברות הובלה מתמודדות על המחיר הטוב ביותר עבורכם</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum5} alt="sum5" />
          <p className='text-sm text-center'>לחצו על כפתור "צור בקשת מחיר" ופתחו בקשת מחיר בין חברות הובלה שונות</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="flex flex-col items-center underline">למה להשתמש בכרטיס בקשת מחיר?</h3>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>1</p>
          <p className='font-semibold'>הנחה משמעותית</p>
          <p>חסכו מאות שקלים על שירותי הובלת דירות</p>
        </div>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>2</p>
          <p className='font-semibold'>הצעות מתחרותיות</p>
          <p>חברות הובלה מתחרות על המחיר הטוב ביותר עבורכם</p>
        </div>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>3</p>
          <p className='font-semibold'>שקיפות</p>
          <p>תקבלו הצעות מחיר מדוייקות מחברות הובלה אמינות</p>
        </div>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>4</p>
          <p className='font-semibold'>נוחות</p>
          <p>תקבלו את כל ההצעות במקום אחד</p>
        </div>
      </div>
    </div>

  )
}

export default Final
