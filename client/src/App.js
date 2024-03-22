import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { HelmetProvider } from 'react-helmet-async'
import ProductDetails from "./pages/Product/ProductDetails";
import SearchProducts from "./pages/Product/SearchProducts";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Profile from "./pages/User/Profile";
import EditProfile from './pages/User/EditProfile'
import { store } from './store'
import { useEffect, useState } from "react";
import { loadUser } from "./actions/authActions";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import ChangePassword from "./pages/User/ChangePassword";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Shipping/Shipping";
import ConfirmOrder from "./pages/Shipping/ConfirmOrder";
import { BASE_URL } from "./baseUrl";
import Payment from "./pages/Shipping/Payment";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { privateAxios } from "./baseAxios";
import OrderSuccess from "./pages/Shipping/OrderSuccess";
import MyOrders from "./pages/Orders/MyOrders";
import OrderDetails from "./pages/Orders/OrderDetails";
import { useSelector } from "react-redux";
import DashBoard from "./pages/Admin/DashBoard";
import AdminLayout from "./components/AdminLayout";
import ProductsList from "./pages/Admin/Products/ProductsList";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import EditProduct from "./pages/Admin/Products/EditProduct";
import OrderList from "./pages/Admin/Orders/OrderList";
import EditOrder from "./pages/Admin/Orders/EditOrder";
import UsersList from "./pages/Admin/Users/UsersList";
import EditUser from "./pages/Admin/Users/EditUser";
import ReviewList from "./pages/Admin/Reviews/ReviewList";

function App() {

  const { isAuthenticated } = useSelector(state => state.authState)

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(()=> {
    store.dispatch(loadUser)
  }, [])

  useEffect(() => {
    const getStripeApiKey = async () => {
      const { data } = await privateAxios.get(`${BASE_URL}/api/v1/stripeapi`)
      setStripeApiKey(data.stripeApiKey)
    }
    if(isAuthenticated){
      getStripeApiKey()
    }
  }, [isAuthenticated])

  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="search/:keyword" element={<SearchProducts/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>} />

          {/* Protected Routes */}
          <Route 
            path="myprofile" 
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="myprofile/edit" 
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="myprofile/edit/password" 
            element={
              <ProtectedRoute>
                <ChangePassword/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="shipping" 
            element={
              <ProtectedRoute>
                <Shipping/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="order/confirm" 
            element={
              <ProtectedRoute>
                <ConfirmOrder/>
              </ProtectedRoute>
            } 
          />
          {
            stripeApiKey && (
              <Route 
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  </ProtectedRoute>
                }
              />
            )
          }

          <Route 
            path="order/success" 
            element={
              <ProtectedRoute>
                <OrderSuccess/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="orders" 
            element={
              <ProtectedRoute>
                <MyOrders/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="order/:id" 
            element={
              <ProtectedRoute>
                <OrderDetails/>
              </ProtectedRoute>
            } 
          />

          {/* Public Routes */}
          <Route path="password/forgot" element={<ForgotPassword/>}/>
          <Route path="password/reset/:token" element={<ResetPassword/>}/>
          <Route path="cart" element={<Cart/>} />
        
        </Route>
      </Routes>
      <Routes>
        {/* Admin Pages */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminLayout/>
            </ProtectedRoute>}
        >
          <Route path="dashboard" element={<DashBoard/>}/>
          <Route path="products" element={<ProductsList/>}/>
          <Route path="product/create" element={<CreateProduct/>} />
          <Route path="product/:id" element={<EditProduct/>} />
          <Route path="orders" element={<OrderList/>} />
          <Route path="order/:id" element={<EditOrder/>} />
          <Route path='users' element={<UsersList/>}/>
          <Route path="user/:id" element={<EditUser/>} />
          <Route path="reviews" element={<ReviewList/>} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
