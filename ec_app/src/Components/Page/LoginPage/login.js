import background_img from './img/background.png'
import {Link} from 'react-router-dom'
import phone from './img/phone.svg'
import pass from './img/pass.svg'
import React, {useState} from 'react'
import axios from 'axios'
import fetch from 'node-fetch'

function Login() {
    const [user, setUser] = useState({
        phonenumber:'', password:''   
    })
    const [condi, setCondition] = useState(0)

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            // check PhoneNumber
            var regExp = /[a-zA-Z]/g;
            if (user.phonenumber.length !== 10 || regExp.test(user.phonenumber)) {
                setCondition(2)
            } else {
                const res = await axios.post('https://aw-ec01-06.herokuapp.com/customers/sign-in', {...user})
                localStorage.setItem('firstLogin', true)
                localStorage.setItem('refreshtoken', res.data.refreshtoken)
                window.location.href = "/";
            }
        } catch (err) {
            if (err.response.data.msg === "Username is not exist." || err.response.data.msg === "Incorrect password.") {
                setCondition(1)
            } 
        }
    }
    const conditionInfo = () => {
        if (condi === 1) {
            return (
                <div className='Input_info'>
                    <span>SĐT hoặc mật khẩu không hợp lệ!</span>
                </div>
            )
        }
        if (condi === 2) {
            return (
                <div className='Input_info'>
                    <span>Số điện thoại không đúng định dạng!</span>
                </div>
            )
        }
    }

    return (
        <div className="login">
            <div className="login__image">
                <img src={background_img} alt="" />
            </div>
            <div className="login__form">
                <h1>Đăng Nhập</h1>
                <form>
                    <div className="Input-Form1">
                        <div>
                            <img src={phone} alt=""/>
                        </div>
                        <input type="tel" name="phonenumber" value={user.phonenumber} onChange={onChangeInput} required placeholder="Phone Number"/>
                    </div>
                    <div className="Input-Form1">
                        <div>
                            <img src={pass} alt=""/>
                        </div>
                        <input type="password" name="password" required autoComplete="on" placeholder="Password" onChange={onChangeInput} />
                    </div>
                    {conditionInfo()}

                    <div className="form_MK">
                        <h5><Link to="/buyer/reset">Quên mật khẩu</Link></h5>
                    </div>

                </form>
                <div className="Form-Button">
                    <button type="submit" onClick={loginSubmit} ><span>Đăng Nhập</span></button>
                </div>

                <div className="Form-Account">
                    <p>Chưa có tài khoản?  <Link to="/register">Đăng ký ngay</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login