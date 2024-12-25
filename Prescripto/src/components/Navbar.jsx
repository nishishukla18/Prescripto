import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken} = useContext(AppContext)
  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <div className='flex items-center justify-between text-sm border-b border-gray-400 py-4'>
      <img src={assets.logo} alt="" className='w-44 cursor-pointer' />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img src={assets.profile_pic} alt="Profile" className='w-8 rounded-full ' />
            <img src={assets.dropdown_icon} alt="Dropdown" className='w-2.5' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p className='hover:text-black cursor-pointer' onClick={()=>navigate('my-profile')}>My Profile</p>
                    <p className='hover:text-black cursor-pointer' onClick={()=>navigate('my-appointments')}>My Appointments</p>
                    <p className='hover:text-black cursor-pointer' onClick={logout}>Logout</p>
                </div>
                
            </div>
          </div>
        ) : (
          <button
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
