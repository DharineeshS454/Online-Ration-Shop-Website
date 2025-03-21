import React from 'react'
import { CiFilter } from "react-icons/ci";

const FilterProduct = ({category,onClick}) => {
  return (
    
<div onClick={onClick}>
<div className='text-3xl  p-5 bg-yellow-500 rounded-full cursor-pointer '>
<CiFilter />


</div>
<p className='text-center font-medium my-1 capitalize'>{category}</p>


</div>

  )
}

export default FilterProduct
