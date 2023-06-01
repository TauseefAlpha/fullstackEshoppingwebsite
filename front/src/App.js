// import './App.css';
import Home from './screens/Home'
import { Routes, Route } from 'react-router-dom'
import Detailproductscreen from './screens/Detailproductscreen';
import Footer from './components/Footer';
import ErrorPage from './screens/ErrorPage';
import Navbar from './components/Navbar';
import Cart from './screens/Cart';
import SignInForm from './screens/SignInForm';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import HandleShipping from './screens/HandleShipping';
import SignupForm from './screens/SignupForm';
import PaymentHandle from './screens/PaymentHandle';
import Placeoder from './screens/Placeoder';
import Oderscreenpreview from './screens/Oderscreenpreview';
import HistoryofOder from './screens/HistoryofOder';
import UpdateUserProfile from './screens/UpdateUserProfile';







function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/product/:slug' element={<Detailproductscreen />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/updateprofile' element={<UpdateUserProfile />} />
          <Route path='/shipping' element={<HandleShipping />} />
          <Route path='/paymenthandle' element={<PaymentHandle />} />
          <Route path='/oderplace' element={<Placeoder />} />
          <Route path='/oder/:id' element={<Oderscreenpreview />} />
          <Route path='/orderhistory' element={<HistoryofOder />} />

          {/* <Route path='/footer' element={<Footer />} /> */}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
