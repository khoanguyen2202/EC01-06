import LoginPage from './Page/LoginPage.js'
import RegisterPage from './Page/RegisterPage.js'

import {Routes, Route} from 'react-router-dom'


function RouterPage() {
    return (
        <Routes>
            <Route path="/register/te" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            
            
        </Routes>
    )
}

export default RouterPage