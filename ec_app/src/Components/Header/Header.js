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

function Header() {
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
                <button type='submit'>
                    <img src={search_logo} alt="" />
                </button>
                <input type="text" placeholder='Search...' name="q"/>
            </div>
            <div className="header4">
                <img src={check_list_icon} alt=""/>
                <h4>
                    Danh mục
                    <div className="header4_checklist">
                        <ul>
                            <li>
                                <img src={keyboard_icon} alt=""/>
                                <p className='header4_checklist_p'>Bàn phím</p>
                            </li>
                            <li>
                                <img src={mouse_icon} alt=""/>
                                <p className='header4_checklist_p'>Chuột</p>
                            </li>
                            <li>
                                <img src={component} alt=""/>
                                <p className='header4_checklist_p'>Tai nghe</p>
                            </li>
                            <li>
                                <img src={group_icon} alt=""/>
                                <p className='header4_checklist_p'>Bộ sạc</p>
                            </li>
                            <li>
                                <img src={test} alt=""/>
                                <p className='header4_checklist_p'>Sạc dự phòng</p>
                            </li>
                            <li>
                                <img src={test2} alt=""/>
                                <p className='header4_checklist_p'>Ốp lưng</p>
                            </li>
                            <li>
                                <img src={test1} alt=""/>
                                <p className='header4_checklist_p'>Gậy selfi</p>
                            </li>
                            <li>
                                <img src={group_icon1} alt=""/>
                                <p className='header4_checklist_p'>Giá đỡ điện thoại</p>
                            </li>
                            <li>
                                <img src={group_icon2} alt=""/>
                                <p className='header4_checklist_p'>Webcam</p>
                            </li>
                            <li>
                                <img src={group_icon3} alt=""/>
                                <p className='header4_checklist_p'>Thiết bị mạng</p>
                            </li>
                        </ul>
                    </div>
                </h4>
            </div>
            <div className="header5">
                <img src={location_icon } alt=""/>
                <h4>Cửa hàng gần nhất</h4>
            </div>
            <div className="header6">
                <img src={struck_icon} alt=""/>
                <h4>Đơn hàng</h4>
            </div>
            <Link to="/cart">
                <div className="header7">
                    <img src={cart_icon} alt=""/>
                    <h4>Giỏ hàng</h4>
                </div>
            </Link>
            
            <div className="header8">
                <h4>Acount</h4>
            </div>
        </div>
    )
}

export default Header