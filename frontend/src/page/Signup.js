import React, { useState } from 'react'
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import {  Link ,useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const navigate=useNavigate()
    const[showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[data,setData]= useState({
        firstName :"",
        lastName :"" ,
        BPLcardNumber :"" ,
        password :"" ,
        confirmpassword:"",


    });
    console.log(data)
    const handleShowPassword=()=>{
        setShowPassword(preve => !preve)
    }
    const handleShowConfirmPassword =() =>{
        setShowConfirmPassword(preve => !preve)
    }
    const handleOnChange=(e)=>{
        const{name,value }= e.target
        setData((preve)=>{
            return{
              ...preve,
              [name]: value
            }
        })

    }
     console.log(process.env.REACT_APP_SERVER_DOMIN)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {firstName,BPLcardNumber,password,confirmpassword}=data;
        if(firstName && BPLcardNumber && password && confirmpassword){
            if(password===confirmpassword){
                console.log(process.env.REACT_APP_SERVER_DOMIN);
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                method : "POST",
                headers :{
                    "Content-type": "application/json"
                },
                body : JSON.stringify(data),

               });
               
               const dataRes= await fetchData.json()
               console.log(dataRes)
                // alert(dataRes.message);
                toast(dataRes.message);

                if(dataRes.alert){
                 navigate("/login"); 
                }
               
            }
            else{
                alert("password and confirm password not equal");
            }
        }
        else{
            alert("Please Enter required Field");
        }


    }
  return (
    <div className='p-3'>
      <div className='w-full max-w-sm bg-white m-auto flex justify-center flex-col p-4'>
        <h1 className='text-center text-2xl font-bold'>Sign Up</h1>
        
<form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
    <label htmlFor='firstName' >First Name</label>
    <input type={"text"} id="firstName" name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-500'value={data.firstName}
    onChange={handleOnChange}/>

    <label htmlFor='lastName'>Last Name</label>
    
    <input type={"text"} id="lastName" name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-500'
    value={data.lastName}
    onChange={handleOnChange}/>

    <label htmlFor='BPLcardNumber'>BPL Card Number</label>
    <input type={"text"} id="BPLcardNumber" name='BPLcardNumber' className='mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-500'
    value={data.BPLcardNumber}
    onChange={handleOnChange}/>

    <label htmlFor='password'>Password</label>
    <div className='flex px-1 py-1 mt-1 mb-2 bg-slate-200 rounded mt-1 mb-2 outline focus-within-blue-500'>
    <input type={showPassword ? "text": "password"} id="password" name='password' className=' w-full bg-slate-200 rounded focus-within:outline-none '
    value={data.password}
    onChange={handleOnChange}/>
    <span className='flex text-xl'onClick={handleShowPassword}>{showPassword ?<BiShow /> : <BiHide />}</span>
    </div>
    <label htmlFor='confirmpassword'>Confirm Password</label>
    <div className='flex px-1 py-1 mt-1 mb-2 bg-slate-200 rounded mt-1 mb-2 outline focus-within-blue-500'>
    <input type={ showConfirmPassword? "text": "password"} id="confirmpassword" name='confirmpassword' className=' w-full bg-slate-200 rounded focus-within:outline-none ' 
    value={data.confirmpassword}
    onChange={handleOnChange}/>
    <span className='flex text-xl'onClick={handleShowConfirmPassword}>{showConfirmPassword ?<BiShow /> : <BiHide />}</span>
    </div>

   <button type="submit"className="w-full max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">Sign up</button>

</form>
<p className='text-left text-sm mt-3'>Already have account ? <Link to={"/login"} className="text-red-500 underline">Login</Link></p>

      </div>
    </div>
  )
}

export default Signup
