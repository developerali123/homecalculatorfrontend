import React from 'react';
import FloorSelect from '../../components/FloorSelect';
import GooglePlacesAutocomplete from '../../components/GooglePlacesAutocomplete';
import RadioButton from '../../components/RadioButton';
import TruckBtn from '../../components/TruckBtn';
import { rocket } from '../../assets';

const Step1 = ({ form, handleFormChange, step }) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <h1 className="md:text-5xl text-3xl font-semibold mt-10 mb-5">מתנפצים לאוויר</h1>
            <h2 className="text-sm">הזן את פרטי כתובת המוצא שלך</h2>

            {/* כתובת */}
            <div className="flex flex-col">
                <h3 className='mb-1 mt-10'>כתובת המוצא</h3>
                <GooglePlacesAutocomplete value={form.originaddress} onChange={handleFormChange} name="originaddress" placeholder="בחר כתובת מוצא" />
                <div className='flex justify-between'>
                    <div>
                        <h3 className='mb-1 mt-5'>האם יש מעלית?</h3>
                        <div className='flex gap-2 border-[1px] border-[#cccccc] rounded-md bg-white w-[200px]'>
                            <RadioButton id="elevatorone" name="originelevator" value="yes" checked={form.originelevator === "yes"} onChange={handleFormChange} label="כן" />
                            <RadioButton id="elevatortwo" name="originelevator" value="no" checked={form.originelevator === "no"} onChange={handleFormChange} label="לא" />
                        </div>
                    </div>
                    <div>
                        <h3 className='mb-1 mt-5'>בחר מספר קומה</h3>
                        <FloorSelect name="originfloor" value={form.originfloor} onChange={(e) => handleFormChange(e)} options={[...Array(20)].map((_, index) => index + 1)} />
                    </div>
                </div>
                <h3 className='mb-1 mt-5'>גישה למשאית</h3>
                <div className='flex gap-2 border-[1px] border-[#cccccc] bg-white rounded-md w-[300px] h-[44px]'>
                    <RadioButton id="accessone" name="origintruckAccess" value="easy" checked={form.origintruckAccess === "easy"} onChange={handleFormChange} label="קלה" />
                    <RadioButton id="accesstwo" name="origintruckAccess" value="medium" checked={form.origintruckAccess === "medium"} onChange={handleFormChange} label="בינונית" />
                    <RadioButton id="accessthree" name="origintruckAccess" value="hard" checked={form.origintruckAccess === "hard"} onChange={handleFormChange} label="קשה" />
                </div>
            </div>

            {/* גישה למשאית */}
            <div className='flex flex-col justify-end items-end px-8 mt-[30px]'>
            </div>
            {/* כפתור להעברת המשאית */}
            <TruckBtn onClick={step} />
            <img src={rocket} alt="rocket" className="rocket-animation absolute bottom-14 left-10 w-26 h-40 max-md:w-24 max-md:h-24 z-10" />
        </div>
    );
};

export default Step1;
