import Dashboard from './Page/dashboard'
import Order from './Page/order'
import Product from './Page/product'
import Sale from './Page/sale'
import User from './Page/user'
import Login from './Page/Login/Login'

import {Routes, Route} from 'react-router-dom'

function RouterPage() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/user" element={<User />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )
}

export default RouterPage