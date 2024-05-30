import React from 'react';
import { Link } from 'react-router-dom';
import { home_bg, sun } from '../assets';
import Balloon from '../components/Balloon';
import Cloud from '../components/Cloud';
import MovingTruck from '../components/MovingTruck';
import SmallCloud from '../components/smallCloud';

const Home = () => {
  return (
    <div className="relative h-full flex flex-col">
      {/* clouds */}
      <div className="absolute md:top-[124px] top-[60px] left-[58px] max-md:left-[14px] md:w-[250px] w-[150px] md:h-[140px] h-[120px] -z-[20]">
        <Cloud />
      </div>
      <div className="absolute md:top-[207px] top-[110px] right-[10px] md:right-[50px] md:w-[250px] w-[120px] h-[118px] -z-[20]">
        <Cloud />
      </div>
      <div className="absolute md:top-[134px] top-[100px] md:right-[50px] right-[130px] md:w-[100px] w-[80px] h-[62px] -z-[20]">
        <SmallCloud />
      </div>
      <div className="absolute top-[360px] right-20 max-md:right-[20px] -z-[20]">
        <Balloon />
      </div>
      <img src={sun} alt="sun" className="absolute top-10 h-[70px] right-[20px] -z-[20] md:hidden" />
      <h2 className='md:text-3xl md:hidden text-2xl font-bold text-center text-white'>Click <span className='text-orange-500 px-2'>n</span><span className='text-white'>Move</span></h2>
      <div className='flex md:justify-around justify-start md:ml-0 ml-5 items-center mt-5'>
        <button className='bg-[#FC7023] text-white md:text-xl text-md rounded-md md:p-3 p-1 md:w-48 w-36 font-semibold'><Link to="/login">log in for Moving companies </Link></button>
        <h2 className='md:text-3xl text-2xl bm-font md:flex hidden text-white'>Click <span className='text-orange-500 px-2'>n</span><span className='text-white'>Move</span></h2>
      </div>

      <div className="flex flex-col h-full justify-center items-center ">
        <h1 className="text-2xl font-semibold mt-20">Let's find out </h1>
        <h2 className="md:text-4xl text-3xl font-bold text-white mt-10">what your Moving cost is</h2>
        <p className='mt-[30px] text-center w-[535px] max-md:w-full'>
          Planning to move house? Excellent! But before you start packing, let's check how much the transport will really cost you. With our easy (but accurate!) calculator, you will be able to arrive at an estimate of the shipping cost very quickly.
        </p>
        <h3 className='mt-[15px] font-bold'>lets start!</h3>
      </div>
      <div className="mt-[40px]" >
        <MovingTruck link="/baseline" />
      </div>
      <div className='w-full md:h-[400px] h-[200px] mt-20 -z-[30] flex justify-end'>
        <img src={home_bg} alt="home_bg" className="w-full" />
      </div>
    </div>
  );
};

export default Home;
