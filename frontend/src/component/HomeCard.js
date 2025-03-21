import React from 'react'

const HomeCard = ({name,image,price,loading}) => {
  return (
    <div className='bg-white shadow-md p-4 rounded min-w-[150px]'>
      {
        name ? (<>
            <div className='w-40 min-h-[160px]'>
        <img src={image} alt={name} className="h-full w-full "/>
      </div>
      <h3 className='font-semibold text-slate-600 text-center captalize text-xl'>{name}</h3>
      <p className='text-center font-bold'><span className='text-red-500'>₹</span><span>{price}</span></p>

        
        </>
      ) :
      <p>{loading}</p>
    }
    </div>
  )
}

export default HomeCard
