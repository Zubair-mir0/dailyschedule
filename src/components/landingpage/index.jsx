import React from 'react'
import { useEffect } from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
// import { auth } from "../../config/firebase";



export const Landing = () => {
  const navigate =useNavigate();
    useEffect(()=>{
      // const email= localStorage.getItem("email")
      const uid= localStorage.getItem("uid")
      
      if(!uid){
        navigate("/login");
      }
      else{
        navigate("/Landing");
      }
      },[navigate]);
  return (
    <div className='flex justify-center'>
      
      <div className='h-96 flex flex-col w-60  text-white shadow-lg'>

    
      </div>

    </div>
  )
}


