import React from 'react'
import ExhibitorLogin from '../../components/Exhibitor/ExhibitorLogin'
import ExhibitorHeader from '../../components/Exhibitor/ExhibitorHeader'

function ExhibitorLoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className='bg-red-300 absolute top-0 left-0'>
        <ExhibitorHeader/>
      </div>
      <div className="p-4 bg-base-200 rounded-2xl shadow-lg w-full max-w-md">
        <ExhibitorLogin />
      </div>
    </div>

  )
}

export default ExhibitorLoginPage
