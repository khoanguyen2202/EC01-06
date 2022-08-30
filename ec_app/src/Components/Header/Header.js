import asscessory_world_logo from './icon/accesssory_world.svg'
import search_logo from './icon/Search_Icon.png'
import check_list_icon from './icon/fe_document.svg'
import location_icon from './icon/akar-icons_location.svg'
import struck_icon from './icon/bi_truck.svg'
import cart_icon from './icon/akar-icons_cart.svg'
import keyboard_icon from './icon/bi_keyboard-fill.svg'
import mouse_icon from './icon/bx_mouse-alt.svg'
import group_icon from './icon/Group.svg'
import group_icon1 from './icon/Group (1).svg'
import group_icon2 from './icon/Group (2).svg'
import group_icon3 from './icon/Group (3).svg'
import component from './icon/Component.svg'
import test from './icon/material-symbols_ev-charger-outline.svg'
import test1 from './icon/selfie-stick 1.svg'
import test2 from './icon/dt.svg'
import { Link } from 'react-router-dom'
import React, { useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'

function Header() {
    const [search, setSearch] = useState("")
    const state = useContext(GlobalState)
    const [Cart, setCart] = state.Cart
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    
    const onChangeSearch = e => {
        setSearch(e.target.value)
    }

    const showCart = () => {
        if (Cart !== null) {
            return (
                <span>{Cart.length}</span>
            )
        } else{
            return (
                <></>
            )
        }
    }
    
    const showAccount = () => {
        if (isLogged) {
            return (
                <Link to="/userinfo">
                    <div className="header8">
                        <h4>Tài khoản</h4>
                    </div>
                </Link>
            )
        } else {
            return (
                <Link to="/login">
                    <div className="header8">
                        <h4>Đăng nhập</h4>
                    </div>
                </Link>
            )
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <div className="header1">
                    <img src={asscessory_world_logo} alt="" />
                </div>
            </Link>
            
            <div className="header2">
                <h3>Accessosy World</h3>
            </div>
            
            <div className="header3">
                <Link to={"/show/search=" + search}>
                <button type='submit'>
                    <img src={search_logo} alt="" />
                </button>
                </Link>
                <input onChange={(e) => {onChangeSearch(e)}} type="text" placeholder='Search...' name="q"/>
                
            </div>
            <div className="header4">
                <img src={check_list_icon} alt=""/>
                <h4>
                    Danh mục
                    <div className="header4_checklist">
                        <ul>
                            <li>
                                <img src={keyboard_icon} alt=""/>
                                <Link to="/show/category=Bàn%20phím" onClick={()=>{window.location.href="/show/category=Bàn%20phím"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Bàn phím</p>
                                </Link>
                            </li>
                            <li>
                                <img src={mouse_icon} alt=""/>
                                <Link to="/show/category=Chuột" onClick={()=>{window.location.href="/show/category=Chuột"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Chuột</p>
                                </Link>
                            </li>
                            <li>
                                <img src={component} alt=""/>
                                <Link to="/show/category=Tai%20nghe" onClick={()=>{window.location.href="/show/category=Tai%20nghe"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Tai nghe</p>
                                </Link>
                            </li>
                            <li>
                                <img src={group_icon} alt=""/>
                                <Link to="/show/category=Bộ%20sạc"onClick={()=>{window.location.href="/show/category=Bộ%20sạc"}}  style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Bộ sạc</p>
                                </Link>
                            </li>
                            <li>
                                <img src={test} alt=""/>
                                <Link to="/show/category=Sạc%20dự%20phòng" onClick={()=>{window.location.href="/show/category=Sạc%20dự%20phòng"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Sạc dự phòng</p>
                                </Link>
                            </li>
                            <li>
                                <img src={test2} alt=""/>
                                <Link to="/show/category=Ốp%20lưng"  onClick={()=>{window.location.href="/show/category=Ốp%20lưng"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Ốp lưng</p>
                                </Link>

                                
                            </li>
                            <li>
                                <img src={test1} alt=""/>
                                <Link to="/show/category=Gậy%20selfie" onClick={()=>{window.location.href="/show/category=Gậy%20selfie"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Gậy selfie</p>
                                </Link>
                                
                            </li>
                            <li>
                                <img src={group_icon1} alt=""/>
                                <Link to="/show/category=Giá%20đỡ%20điện%20thoại" onClick={()=>{window.location.href="/show/category=Giá%20đỡ%20điện%20thoại"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Giá đỡ điện thoại</p>
                                </Link>
                                
                            </li>
                            <li>
                                <img src={group_icon2} alt=""/>
                                <Link to="/show/category=Webcame" onClick={()=>{window.location.href="/show/category=Webcame"}} style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Webcam</p>
                                </Link>
                                
                            </li>
                            <li>
                                <img src={group_icon3} alt=""/>
                                <Link to="/search?category=thiet%20bi%20mang"onClick={()=>{window.location.href="search?category=thiet%20bi%20mang"}}  style={{textDecoration: 'none', color: 'black'}}>
                                    <p className='header4_checklist_p'>Thiết bị mạng</p>
                                </Link>
                                
                            </li>
                        </ul>
                    </div>
                </h4>
            </div>
            <Link to="/storemap">
            <div className="header5">
                <img src={location_icon } alt=""/>
                <h4>Cửa hàng gần nhất</h4>
            </div>
            </Link>
            
            <Link to={"/customer/order"}>
                <div className="header6">
                    <img src={struck_icon} alt=""/>
                    <h4>Đơn hàng</h4>
                </div>
            </Link>
           
            <Link to="/cart">
                <div className="header7">
                    {showCart()}
                    <img src={cart_icon} alt=""/>
                    <h4>Giỏ hàng</h4>
                </div>
            </Link>
            
            {showAccount()}
        </div>
    )
}

export default Header