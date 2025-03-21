import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CardFeature from './CartFeature';
import FilterProduct from './FilterProduct';

const AllProduct = ({heading}) => {
    const productData =useSelector((state)=>state.product.productList);
    const categoryList = [...new Set(productData.map(el=>el.category))]
    
    const [dataFilter,setDataFilter] = useState([])

  useEffect(()=>{
    setDataFilter(productData)
  },[productData])


  const handleFilterProduct =(category)=>{
    setDataFilter(()=>{
      const filter = productData.filter(el=>el.category.toLowerCase() === category.toLowerCase() )
      return[
            ...filter
      ]
    })
  }
  
  return (
    <div>
      <div className='my-5'>
<h2 className='font-bold text-2xl text-slate-800 mb-4'>
   {heading}
</h2>
<div className='flex gap-4 justify-center'>
  {
    categoryList[0] && categoryList.map((el)=>{
      return(
        <FilterProduct category={el} key={el} onClick={()=>handleFilterProduct(el)}/>
      )
    })
  }

</div>
<div className='flex flex-wrap justify-center gap-2'>
{
  dataFilter.map((el)=>{
    return(
      <CardFeature
      key={el._id}
      id={el._id} 
      name={el.name}
      category={el.category}
      price={el.price}
      image={el.image}
      />
    )
  })
}
</div>


</div>
    </div>
  )
}

export default AllProduct
