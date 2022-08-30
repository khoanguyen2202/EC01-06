import background_img from './img/background.png'
// import {Link} from 'react-router-dom'
import phone from './img/phone.svg'
import pass from './img/pass.svg'
import React, {useState} from 'react'
import axios from 'axios'


function Register() {
    const [user, setUser] = useState({
        phonenumber:'', password:'', rePassword:''  
    })

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const [condi, setCondition] = useState(0)

    const loginSubmit = async e =>{
        e.preventDefault()

        try{
            // check PhoneNumber
            var regExp = /[a-zA-Z]/g;
            // check Pass
            if (user.phonenumber.length <= 3 || regExp.test(user.phonenumber)) {
                setCondition(1);
            } else 
            if (user.password !== user.rePassword) {
                setCondition(2);
            } else {
                var msgReq = {"phonenumber":user.phonenumber, "password":user.password}
                const res = await axios.post('https://aw-ec01-06.herokuapp.com/customers/sign-up', msgReq)
                
                localStorage.setItem('token', res.data.accesstoken)
                alert("Đăng ký thành công")

                window.location.href = "/login";
            }
            

        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    const showCondition = ()  => {
        if (condi === 1) {
            return (
                <div className='Input_info1'>
                    <span>Số điện thoại không đúng định dạng!</span>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <div className="register">
            <div className="register__image">
                <img src={background_img} alt="" />
            </div>
            <div className="register__form">
                <h1>Đăng ký</h1>
                <form >
                    <div className="Input-Form1">
                        <div>
                            <img src={phone} alt=""/>
                        </div>
                        <input type="tel" name="phonenumber" value={user.phonenumber} onChange={onChangeInput} required placeholder="Số Điện Thoại"/>
                    </div>
                    {showCondition()}

                    <div className="Input-Form1">
                        <div>
                            <img src={pass} alt=""/>
                        </div>
                        <input type="password" name="password" required autoComplete="on" placeholder="Mật khẩu" onChange={onChangeInput} />
                    </div>

                    <div className="From_Request">
                        <ul>
                            <li>Mật khẩu phải dài từ 8 - 20 ký tự</li>
                            <li>Mật khẩu phải bao gồm chữ thường, chữ in hoa, số và ký tự đặc biệt</li>
                        </ul>
                    </div>

                    <div className="Input-Form1">
                        <div>
                            <img src={pass} alt=""/>
                        </div>
                        <input type="password" name="rePassword" required autoComplete="on" placeholder="Nhập lại mật khẩu" onChange={onChangeInput} />
                    </div>

                </form>
                <div className="Form-Button">
                    <button type="submit" onClick={loginSubmit} ><span>Đăng Ký</span></button>
                </div>

            </div>
        </div>
    )
}

export default Register