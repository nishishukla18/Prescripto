import React from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { useContext, useEffect } from 'react'

function DocDash() {
    const {dashData,setDashData,getDashData,dToken} = useContext(DoctorContext)

    useEffect(() => {
      getDashData()
    },[dToken])
  return dashData &&(
    <div>
        
    </div>
  )
}

export default DocDash