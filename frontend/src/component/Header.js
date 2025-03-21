import React, { useState } from 'react'
import logo from "../assest/logo.jpg"
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast} from "react-hot-toast"

 
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state)=>state.user)
    
    const dispatch = useDispatch()
    const handleShowMenu=()=>{
        setShowMenu(preve => !preve)
    }

    const handleLogout = ()=>{
      dispatch(logoutRedux())
      toast("Logout Successfully")

    }
    const cartItemNumber = useSelector((state)=>state.product.cartItem)
    return (
        <header className='fixed shadow-md w-full h-16 px-4 z-50 bg-white'>
            <div>
                <div className='flex items-center h-full justify-between'>
                    <Link to={""}>
                        <div className='h-12'>
                            <img src={logo} className="h-full" />
                        </div>
                    </Link>
                    <div className="flex items-center gap-6">
                        <nav className="flex gap-5 text-base">
                            <Link to={""}>Home</Link>
                            <Link to={"menu/655cf9e8a60f62bf9216615f"}>Menu</Link>
                            <Link to={"contact"}>Contact</Link>

                        </nav>
                        <div className='text-2xl text-slate-600 relative'>
                          <Link to={"cart"}>  < FaCartShopping />
                            <div className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">{cartItemNumber.length}</div>
                            </Link>
                        </div>
                     
                        <div className='text-xl text-slate-600'onClick={handleShowMenu}>
                            <div className="border-2 border-solid border-slate-600 p-2 rounded-full cursor-pointer">
                              { userData.firstName  ? <userData.firstName /> : < FaUser />


                                }  

                                 
                            </div>
                          
                            {
                                showMenu &&( <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col">
                                    {
                                        userData.BPLcardNumber === process.env.REACT_APP_ADMIN_BPLNUMBER &&<Link to={"products"}  className=" whitespace-nowrap cursor-pointer px-2  ">Products</Link>
                                    }
                                    
                                    {
                                         userData.firstName ? <p className="cursor-pointer text-white bg-red-500 px-2 " onClick={handleLogout}>Logout ({userData.firstName})</p> :<Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">Login</Link>
                                    }
                                    
                                    
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
