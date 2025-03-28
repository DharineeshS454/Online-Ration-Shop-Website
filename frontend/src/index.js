import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{ createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import Home from './page/Home';
import Contact from './page/Contact';
import  Menu  from './page/Menu';
import Login from './page/Login';
import Signup from './page/Signup';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import Product from './page/Product';
import Cart from './page/Cart';

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
<Route index element={<Home/>}/>
{/* <Route path='menu' element={<Menu/>}/> */}
<Route path='menu/:filterby' element={<Menu/>}/>
<Route path='contact' element={<Contact/>}/>
<Route path='login' element={<Login/>}/>
<Route path='products' element={<Product/>}/>
<Route path='signup' element={<Signup/>}/>
<Route path='cart' element={<Cart/>}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
  <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
