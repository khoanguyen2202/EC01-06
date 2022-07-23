import background_img from './img/background.png'
import {Link} from 'react-router-dom'
import phone from './img/phone.svg'
import pass from './img/pass.svg'
import React, {useState} from 'react'
import axios from 'axios'


function Login() {
    const [user, setUser] = useState({
        phone:'', password:''   
    })

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:7000/user/login', {...user})

            // Save first login and accesstoken in localStorage of Chrome
            localStorage.setItem('firstLogin', true)
            localStorage.setItem('token', res.data.accesstoken)

            window.location.href = "/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login">
            <div className="login__image">
                <img src={background_img} alt="" />
            </div>
            <div className="login__form">
                <h1>Đăng Nhập</h1>
                <form >
                    <div className="Input-Form1">
                        <div>
                            <img src={phone} alt=""/>
                        </div>
                        <input type="tel" name="tel" value={user.phone} onChange={onChangeInput} required placeholder="Phone Number"/>
                    </div>
                    <div className="Input-Form1">
                        <div>
                            <img src={pass} alt=""/>
                        </div>
                        <input type="password" name="password" required autoComplete="on" placeholder="Password" onChange={onChangeInput} />
                    </div>

                    <div className="form_MK">
                        <h5><Link to="/buyer/reset">Quên mật khẩu</Link></h5>
                    </div>

                </form>
                <div className="Form-Button">
                    <button type="submit" onclick={loginSubmit} ><span>Đăng Nhập</span></button>
                </div>

                <div className="Form-Account">
                    <p>Chưa có tài khoản?  <Link to="/register">Đăng ký ngay</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login