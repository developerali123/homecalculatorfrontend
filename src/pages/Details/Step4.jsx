import React from 'react';
import TruckBtn from '../../components/TruckBtn';
import { boxes_img, cute_boxes } from '../../assets';

const Step4 = ({ progress, handleProgressChange, step }) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <h1 className='md:text-5xl text-3xl font-semibold mt-10 mb-5'>הוסף תיבות למשאית שלך</h1>
            <p className='mt-6'>תיקים נחשבים גם כקופסאות</p>

            {/* סרגל התקדמות */}
            <div className="flex justify-center items-center mt-8 px-3">
                <p className='mr-8 font-medium'>אין לי בכלל</p>
                <קלט
                    type="range"
                    min="0"
                    max="100"
                    value={התקדמות}
                    onChange={handleProgressChange}
                    style={{
                        width: '35%', // התאם את הרוחב לפי הצורך
                        רקע: `linear-gradient(לימין, #ff7f0e 0%, #ff7f0e ${progress}%, #868686 ${progress}%, #868686 100%)`, // צבע כתום לאפור
                        appearance: 'none', // מסיר סגנונות ברירת מחדל
                        height: '13px', // התאם את הגובה לפי הצורך
                        borderRadius: '5px', // פינות מעוגלות
                        outline: 'none', // מסיר את outline
                    }}
                />
                <p className='ml-8 font-medium'>יש לי הרבה</p>
            </div>

            <div className="text-center text-2xl mt-4 font-semibold pb-8">
                <p>{progress}</p>
            </div>
            <TruckBtn onClick={step} />
            {/* תמונת רקע */}
            <img src={boxes_img} alt="background" className='absolute bottom-0 w-full h-1/2 -z-20' />

            {/* רכיב קופסאות חמוד */}
            <img src={cute_boxes} alt="cute_boxes" className='absolute bottom-0 right-36 h-1/3 -z-20 mb-16 hidden lg:block' />
        </div>
    )
}

export default Step4