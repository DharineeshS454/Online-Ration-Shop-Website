import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlide'

const Menu = () => {
  const {filterby} = useParams()
  const dispatch=useDispatch()
  const productData = useSelector(state => state.product.productList)
 const productDisplay = productData.filter(el =>el._id === filterby)[0];
 console.log(productDisplay)
 
 const handleAddCartProduct = (e) => {
  dispatch(addCartItem(productDisplay))
};
  return (
    <div className='p-2'>
       <div className="w-full max-w-4xl m-auto  bg-white flex">
       <div className="max-w-sm  overflow-hidden w-full p-5 ">
          <img src={productDisplay.image}
            className="hover:scale-105 transition-all h-full"/>
        </div>
        <div className='flex flex-col gap-4'>
        <h3 className='font-semibold text-slate-600 text-center captalize text-4xl'>{productDisplay.name}</h3>
        <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
      <p className='text-center font-bold'><span className='text-red-500'>₹</span><span>{productDisplay.price}</span></p>
      <div className='flex gap-3'>
      <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full min-w-[100px]">Buy
        </button>
        <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full min-w-[100px]">Add Cart
        </button>
      </div>
        </div>
       </div>
       <AllProduct heading={"Products"}/>
    </div>
  )
}

export default Menu
