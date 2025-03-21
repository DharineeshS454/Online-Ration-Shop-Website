import React, { useState } from 'react'
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { loginRedux } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
    const[showPassword,setShowPassword]=useState(false)
    
    const[data,setData]= useState({
        
        BPLcardNumber :"" ,
        password :"" ,
        


    });
    const navigate = useNavigate()
     const userData = useSelector(state => state)
     

     const dispatch = useDispatch();
    const handleShowPassword=()=>{
        setShowPassword(preve => !preve)
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

    const handleSubmit =async(e)=>{
        e.preventDefault()
        const {BPLcardNumber,password}=data
        if(BPLcardNumber && password ){
          try{
           
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
            method : "POST",
            headers :{
                "Content-type": "application/json"
            },
            body : JSON.stringify(data),

           });
           
           const dataRes= await fetchData.json()
           console.log(dataRes)
          
           toast( dataRes.message)
           if(fetchData.ok){
              dispatch(loginRedux(dataRes));
            console.log("Login successful");
            setTimeout(()=>{
              navigate("/")
            },1000)
        }
        else{
          console.error("Login failed:", dataRes.message);
        }
      }catch (error){
        console.error("Fetch error:", error.message);
      }

      console.log(userData)
    }else{
            alert("Please Enter required Field")
        }


    };
  return (
    <div className='p-3'>
      <div className='w-full max-w-sm bg-white m-auto flex justify-center flex-col p-4'>
        <h1 className='text-center text-2xl font-bold'>Login</h1>
        
<form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
    

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
    
   <button type="submit"className="w-full max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">Login</button>

</form>
<p className='text-left text-sm mt-3'>Don't have account ? <Link to={"/Signup"} className="text-red-500 underline">Sign Up</Link></p>

      </div>
    </div>
  )
}

export default Login
