import React from 'react';
import { truck, arrow } from "../assets";
import { useNavigate } from 'react-router-dom';

const MovingTruck = ({link}) => {
  const navigate = useNavigate();

  return (
    <div className='text-white text-lg  '>
        <button onClick={() => navigate(link)} className='w-full flex gap-5 items-center justify-center'>
            {/* <p>לדרך</p> */}
            <img src={truck} alt="truck" className='moving-truck ml-96' />
            {/* <p>צא</p> */}
        </button>
        <div className='w-full flex items-center justify-center'>
            <img src={arrow} alt="arrow" />
        </div>
        <h2 className='w-full text-xl flex items-center justify-center bm-font'>Click <span className='text-orange-500 px-2'>n</span>Move</h2>
    </div>
  )
}

export default MovingTruck