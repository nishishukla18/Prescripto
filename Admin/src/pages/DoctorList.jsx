import React from 'react'
import { useContext,useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

function DoctorList() {
  const {doctors,aToken,getAllDoctors,changeAvailability} = useContext(AdminContext)
  useEffect(() => {
   if(aToken){
    getAllDoctors()
   }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>Doctor List</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((doctor,index)=>(
        <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
          <img className='bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500' src={doctor.image} alt="" />
          <div className='p-4'>
            <p className='text-neutral-800 text-lg font-medium'>{doctor.name}</p>
            <p className='text-zinc-600 text-sm'>{doctor.speciality}</p>
            <p>{doctor.email}</p>
            <p>{doctor.phone}</p>
            <div className='flex'>
              <input type="checkbox" onChange={()=>changeAvailability(doctor._id)} checked={doctor.available}/>
              <p>Available</p>
            </div>
          </div>
        </div>
          ))
        }
      </div>
    </div>

  )
}

export default DoctorList