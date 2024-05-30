import React from 'react'
import { hotairballoon } from '../assets'
const Balloon = () => {
  return (
    <div className="w-[80px] h-[120px]">
        <img src={hotairballoon} alt="Cloud" className="h-full absolute top-0 smallcloud delay-500" />

    {/* <img src={cloudleft} alt="Cloud Left" className="w-1/2 h-full absolute top-0 cloud-left" /> */}
    </div>
  )
}

export default Balloon