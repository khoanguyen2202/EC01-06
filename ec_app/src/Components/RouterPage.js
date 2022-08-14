import LoginPage from './Page/LoginPage.js'
import RegisterPage from './Page/RegisterPage.js'
import MainPage from './Page/MainPage.js'
import DetailPage from './Page/DetailPage.js'
import CartPage from './Page/CartPage.js'
import UserPage from './Page/UserPage.js'

import {Routes, Route} from 'react-router-dom'


function RouterPage() {
    return (
        <Routes>
            <Route path="/product" element={<DetailPage />} />
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/userinfo" element={<UserPage />} />
            <Route path="/" element={<MainPage />} />
            
        </Routes>
    )
}

export default RouterPage