import React from 'react'
import { BackButton, ButtonFavourite, ButtonInfo } from '../Button/Button'
import DateSelector from './DateSelector'
import { DropdownFilterLanguage, DropdownFilterPrice, DropdownFilterTime } from './DropDownFilter'
import ShowTimeButton from './ShowTimeButton'

function Shows() {
  return (
    <div>
        <div className="bg-base-300 shadow-lg w-full flex flex-col justify-between">
          <div className='px-3 flex shadow-md gap-3 py-3'>
            <BackButton/> 
            <div className='flex flex-col gap-2'>
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold">Avengers: Endgame</h2>
              <div className='flex gap-2'>
                <p className='border px-2 text-sm rounded-full'>UA13+</p>
                <p className='border px-2 text-sm rounded-full'>Action</p>
                <p className='border px-2 text-sm rounded-full'>Thriller</p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between px-5 py-2'>

            <DateSelector/>
            <div className='flex gap-1'>
              <DropdownFilterLanguage/>
              <DropdownFilterPrice/>
              <DropdownFilterTime/>
            </div>
          </div>
        </div>
        <div className='bg-base-100 h-full w-full flex flex-col py-2 items-center'>

          <div className='bg-base-200 h-20 w-[80%] border  flex items-center justify-between px-4'>
            <div className='flex gap-2 items-center'>
              <ButtonFavourite/>
              <p className='text-xl font-bold'>PVR: Lulu Kochi</p>
              <ButtonInfo/>
            </div>
            <p>Cancelation available</p>
            <ShowTimeButton/>
          </div>
          <div className='bg-base-200 h-20 w-[80%] border  flex items-center justify-between px-4'>
            <div className='flex gap-2 items-center'>
              <ButtonFavourite/>
              <p className='text-xl font-bold'>PVR: Lulu Kochi</p>
              <ButtonInfo/>
            </div>
            <p>Cancelation available</p>
            <ShowTimeButton/>
          </div>
          <div className='bg-base-200 h-20 w-[80%] border  flex items-center justify-between px-4'>
            <div className='flex gap-2 items-center'>
              <ButtonFavourite/>
              <p className='text-xl font-bold'>PVR: Lulu Kochi</p>
              <ButtonInfo/>
            </div>
            <p>Cancelation available</p>
            <ShowTimeButton/>
          </div>
          <div className='bg-base-200 h-20 w-[80%] border  flex items-center justify-between px-4'>
            <div className='flex gap-2 items-center'>
              <ButtonFavourite/>
              <p className='text-xl font-bold'>PVR: Lulu Kochi</p>
              <ButtonInfo/>
            </div>
            <p>Cancelation available</p>
            <ShowTimeButton/>
          </div>
         
        </div>
    </div>
  )
}

export default Shows
