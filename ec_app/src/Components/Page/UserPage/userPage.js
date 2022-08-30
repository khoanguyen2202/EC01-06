import account from './img/account.svg'
import ic_sup from './img/support.svg'
import ic_exit from './img/exit.svg'
import ic_hiss from './img/icon_hiss.svg'
import ic_map from './img/bxs_map.svg'
import {GlobalState} from '../../../GlobalState'
import React, { useContext, useEffect, useState} from 'react'
import axios from 'axios'


function Userpage() {
    const state = useContext(GlobalState)
    const [userInfo, setUserInfo] = state.userAPI.userInfo
    const [logout, setLogout] = useState(false)

    const [user, setUser] = useState({
        name:"", nickname:"", dateOfBirth:"", email:"", phone:""
    })
    const [wait, setWait] = useState(false)

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    useEffect(() => {
        const tempt = {
            name:userInfo.name, nickname:userInfo.nickname, dateOfBirth:userInfo.dateOfBirth, email: userInfo.email, phone: userInfo.phone
        }
        setUser({...tempt})
    }, [userInfo])

    const onClickButton = () => {
        setWait(true)
        const token = localStorage.getItem("token")
        // Update
        var data = JSON.stringify(user)
        var config = {
            method: 'post',
            url: 'https://aw-ec01-06.herokuapp.com/customers/update',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': token
            },
            data: data
        }
        axios(config)
        .then(function (res) {
            setWait(false)
            alert("Cập nhật thông tin thành công!")
        })
        .catch(function (error) {
            setWait(false)
            alert("Cập nhật thông tin thất bại!")
        });
        
    }
    const showSpinner = () => {
        if (wait) {
            return (
                <div className="spinner_12"></div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const ClickLogout = () => {
        setLogout(true)
    }

    const ClickCancel = () => {
        setLogout(false)
    }
    const ClickLO = () => {
        localStorage.removeItem("firstLogin")
        localStorage.removeItem("refreshtoken")
        window.location.href = "/";
    }


    const showLogout = () => {
        if (logout) {
            return (
                <div className='place_logout'>
                    <h2>Xác nhận thoát tài khoản</h2>
                    <div className="place_logout_12">
                        <button className='place_logout_12_left' onClick={(e) => {ClickLO()}}>Xác nhận</button>
                        <button className='place_logout_12_right' onClick={(e) => {ClickCancel()}}>Hủy</button>
                    </div>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <div className="Userpage">
            {showSpinner()}
            {showLogout()}
            <div className="userpage_meta">
                <div className="meta_info">
                    <div className="meta_info_img">
                        <img src="https://salt.tikicdn.com/desktop/img/avatar.png" alt=""/>
                    </div>
                    <div className="meta_info_name">
                        <p>Tài khoản của</p>
                        <p className="meta_info_name_1">Lê Tiến Trí</p>
                    </div>
                </div>
                <div className="meta_info_selection">
                    <div className="meta_info_selection_aa">
                        <div className="meta_info_selection_aa_img">
                            <img src={account} alt=""/>
                        </div>
                        <div className="meta_info_selection_aa_name">
                            <p>Tài khoản của bạn</p>
                        </div>
                    </div>
                    <div className="meta_info_selection_aa">
                        <div className="meta_info_selection_aa_img">
                            <img src={ic_hiss} alt=""/>
                        </div>
                        <div className="meta_info_selection_aa_name">
                            <p>Lịch sử mua hàng</p>
                        </div>
                    </div>
                    <div className="meta_info_selection_aa">
                        <div className="meta_info_selection_aa_img">
                            <img src={ic_map} alt=""/>
                        </div>
                        <div className="meta_info_selection_aa_name">
                            <p>Địa chỉ</p>
                        </div>
                    </div>
                    <div className="meta_info_selection_aa">
                        <div className="meta_info_selection_aa_img">
                            <img src={ic_sup} alt=""/>
                        </div>
                        <div className="meta_info_selection_aa_name">
                            <p>Hỗ trợ</p>
                        </div>
                    </div>
                    <div className="meta_info_selection_aa" onClick={() => {ClickLogout()}}>
                        <div className="meta_info_selection_aa_img">
                            <img src={ic_exit} alt=""/>
                        </div>
                        <div className="meta_info_selection_aa_name" >
                            <p>Thoát tài khoản</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="userpage_info">
                {/* case 1: user info */}
                <div className="userpage_user">
                    <h3>Thông tin cá nhân</h3>
                    <div className='userpage_userinfo'>
                        <div className='userpage_1'>
                            <div>
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt="" /> 
                            </div>
                        </div>
                        <div className='userpage_2'>
                            <div className='userpage_2_name'>
                                <div className='userpage_2_name1'>
                                    <span>Họ & Tên</span>
                                </div>
                                <div className='userpage_2_name2'>
                                    <input name="name" value={user.name} onChange={onChangeInput} />
                                </div>
                            </div>
                            <div className='userpage_2_name'>
                                <div className='userpage_2_name1'>
                                    <span>NickName</span>
                                </div>
                                <div className='userpage_2_name2'>
                                    <input name="nickname" value={user.nickname} onChange={onChangeInput} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Ngày sinh</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input name="dateOfBirth" value={user.dateOfBirth} onChange={onChangeInput} className="userpage_user_born_12_date" type="date"/>
                        </div>
                    </div>
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Số điện thoại</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input value={user.phone} type="tel" name="phone" onChange={onChangeInput} className="userpage_user_born_12_tel"/>
                        </div>
                    </div>
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Email</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input value={user.email} type="email" name="email" onChange={onChangeInput} className="userpage_user_born_12_tel"/>
                        </div>
                    </div>

                    <div className='userpage_user_button'>
                        <button onClick={(e) => {onClickButton()}}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userpage