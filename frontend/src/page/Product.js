import React, { useState } from 'react'
import { MdDriveFolderUpload } from "react-icons/md";
import{ ImagetoBase64 } from '../utility/ImagetoBase64'
import toast from 'react-hot-toast';

const Product = () => {
  const [data,setData] = useState({
    name : "",
    category :"",
    image : "",
    price : "",
  
  })
    const handleOnChange = (e) =>{
      const {name,value} = e.target;

      setData((preve)=>{
          return{
            ...preve,
            [name] : value ,
          };
      });

    };

  const uploadImage = async(e) =>{
     const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((preve)=>{
      return {
        ...preve,
        image : data,
      }
    });
  }
    
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(data)

    const {name,image,category,price}=data
    if(name && image && category && price){
      try{
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
          method : "POST",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          });
          const fetchRes =  await fetchData.json()
          console.log(fetchRes);
          toast(fetchRes.message)

          setData(()=>{
            return{
              name : "",
              category : "",
              image : "",
              price : "",
  
            }
          })
      } catch (error){
        console.error("Error uploading product:", error);
      }
      }
      else{
        toast("Enter required fields")
      }

    }
   
  return (
    <div className=" pd-4 ">
      <form className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name="name" className='bg-slate-200 p-1' onChange={handleOnChange} value={data.name}/>
        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"rice"}>Rice</option>
          <option value={"wheat"}>Wheat</option>
          <option value={"sugar"}>Sugar</option>
          <option value={"oils"}>Oils</option>
          <option value={"pulses"}>Pulses</option>
        </select>

      <label htmlFor='image'>Image
      <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
        {
          data.image ? <img src={data.image} alt="Selected Image" className='h-full'/> : <span className='text-5xl'>   <MdDriveFolderUpload /></span>
        }
      
      
      <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className='hidden'/>
      </div>
      </label>
      

      <label htmlFor='price' className='my-1'>Price</label>
      <input type={"text"} className='bg-slate-200 p-1' name='price' onChange={handleOnChange} value={data.price}/>

      <button className='bg-red-500 hover:bg-red-600 text-white text-lg front-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  )
}


export default Product
