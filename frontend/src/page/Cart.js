import React from 'react'
import { useSelector } from 'react-redux';
import CartProduct from '../component/cartProduct';
import toast from "react-hot-toast";



const Cart = () => {
    const productCartItem = useSelector((state)=>state.product.cartItem)
    console.log(productCartItem)
    const user =useSelector(state=>state.user)
    console.log(user)
    const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  const handlePayment = () => {
     if(user.BPLcardNumber){
    toast.success('Payment done!'); // Display a success toast message
     }else{
      toast("Login to make the payment");
     }
  };
  return (
    <div className='p-2 md:p-4'>
      <h2 className="text-lg md:text-2xl font-bold text-green-600">
          Your Cart Items
        </h2>
        <div className='my-4 flex gap-3'>
             {/* display cart items  */}
            <div className='w-full max-w-3xl'>
                {
                    productCartItem.map(el =>{
                        return(
                            <CartProduct 
                            key={el._id}
                            id={el._id}
                            name={el.name}
                            image={el.image}
                            category={el.category}
                            qty={el.qty}
                            total={el.total}
                            price={el.price}
                            />
                        )
                    })
                }
            
            </div>


            {/* total cart item  */}
            <div className='w-full max-w-md  ml-auto'>
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>

            </div>
        </div>

    </div>
  )
}

export default Cart
