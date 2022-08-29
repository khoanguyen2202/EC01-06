import LoginPage from './Page/LoginPage.js'
import RegisterPage from './Page/RegisterPage.js'
import MainPage from './Page/MainPage.js'
import DetailPage from './Page/DetailPage.js'
import CartPage from './Page/CartPage.js'
import UserPage from './Page/UserPage.js'
import StorePage from './Page/StorePage.js'
import Paymentpage from './Page/PaymentPage.js'
import SuccessPage from './Page/SucessPage.js'
import AllPage from './Page/AllPage.js'

import {Routes, Route} from 'react-router-dom'


function RouterPage() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:id" element={<DetailPage />} />
            <Route path="/storemap" element={<StorePage />} />
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/userinfo" element={<UserPage />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/cart/payment-info" element={<Paymentpage />} />
            <Route path="/cart/payment-info/success" element={<SuccessPage />} />
            <Route path="/show/category=:category" element={<AllPage />} />
            <Route path="/show/search=:name" element={<AllPage />} />
            <Route path="/show/all" element={<AllPage />} />
        </Routes>
    )
}

export default RouterPage