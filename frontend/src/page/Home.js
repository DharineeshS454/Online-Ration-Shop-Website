import React, { useEffect, useState } from 'react'
import HomeCard from '../component/HomeCard'
import {useSelector} from "react-redux"
import CardFeature from '../component/CartFeature';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData =useSelector((state)=>state.product.productList);

  const homeProductCartList = productData.slice(1, 5);
   const homeProductCartListPulses =productData.filter(el => el.category ==="pulses",[])
   
  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(2).fill(null)


  
  
  return (
    <div className='p-2'>
      <div className='md:flex gap-4 py-6'>
      <div className='w-1/2 '>
        <div className='flex gap-3 bg-green-200 w-40 px-2 item-center rounded-full'>
          <p className='text-sm font-medium '>Ration Made Easy</p>
          <img src="https://thumbs.dreamstime.com/z/delivery-bike-shipping-fast-man-riding-motorcycle-icon-symbol-pictogram-flat-design-apps-websites-isolated-white-196967070.jpg?w=2048" className='h-7'/>
        </div>
        <h2 className='text-4xl md:text-7xl font-bold py-4'>Quicker Delivery in <span className='text-red-500 '>Your Ration Spot</span> </h2>
        <p className='py-10 text-base max-w-xl md:text-xl'>"Welcome to our Online Ration Distribution platform, where we streamline the process of acquiring essential supplies with a user-friendly digital interface. Our service ensures a smooth and convenient experience for users to order quality ration online and have it delivered directly to their doorsteps. Embrace the ease of accessing vital provisions from the comfort of your home, as we prioritize efficiency and simplicity in meeting your essential needs." </p>

        <button className='text-bold bg-green-200 px-4 py-1 rounded-md'>Order Now</button>
      </div>
      <div className='w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
         homeProductCartList[0] ? homeProductCartList.map((el) =>{
            return(
             <HomeCard
             key={el._id}
             image={el.image}
             category={el.category}
             name={el.name}
             price={el.price}/>
            )
          })
          : loadingArray.map((el,index) =>{
            return(
              <HomeCard
              key={index+"loading"}
              loading={"Loading...."}
            
              
              />
            )
          })
        }
        
      </div>
      <div className=''></div>
      </div>

<div className='my-5'>
<h2 className='font-bold text-2xl text-slate-800 mb-4'>
  Pulses
</h2>
<div className='flex gap-3'>
    {homeProductCartListPulses[0] ? (
      homeProductCartListPulses.map((el) => (
        <CardFeature
          key={el._id+"Pulses"} 
          id={el._id}
          name={el.name}
          category={el.category}
          price={el.price}
          image={el.image}
        />
      ))
    ) : (
      loadingArrayFeature.map((el, index) => (
        <CardFeature key={index+"cartloading"} loading="Loading..." />
      ))
    )}
  </div>
</div>

<AllProduct heading={"Your Product"}/>

    </div>
  )
}

export default Home
