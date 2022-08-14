import account from './img/account.svg'
import ic_sup from './img/support.svg'
import ic_exit from './img/exit.svg'
import ic_hiss from './img/icon_hiss.svg'
import ic_map from './img/bxs_map.svg'


function Userpage() {
    return (
        <div className="Userpage">
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
                    <div className="meta_info_selection_aa">
                        <div className="meta_info_selection_aa_img">
                            <img src={ic_exit} alt=""/>
                        </div>
                        <div className="meta_info_selection_aa_name">
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
                                    <input />
                                </div>
                            </div>
                            <div className='userpage_2_name'>
                                <div className='userpage_2_name1'>
                                    <span>NickName</span>
                                </div>
                                <div className='userpage_2_name2'>
                                    <input />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Ngày sinh</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input className="userpage_user_born_12_date" type="date"/>
                        </div>
                    </div>
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Giới tính</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input type="radio" name="gender" value="male" checked /> <span>Nam</span>
                            <input type="radio" name="gender" value="male" checked /> <span>Nữ</span>
                            <input type="radio" name="gender" value="male" checked /> <span>Khác</span>
                        </div>
                    </div>
        
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Số điện thoại</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input type="tel" name="usrtel" className="userpage_user_born_12_tel"/>
                        </div>
                    </div>
                    <div className='userpage_user_born'>
                        <div className='userpage_user_born_11'>
                            <span>Email</span>
                        </div>
            
                        <div className='userpage_user_born_12'>
                            <input type="email" name="usrtel" className="userpage_user_born_12_tel"/>
                        </div>
                    </div>

                    <div className='userpage_user_button'>
                        <button>Cập nhật</button>
                    </div>
                </div>
                <div className='userpage_userPass'>
                    <h3>Thay đổi mật khẩu</h3>
                    <div className="userpage_userPass_oo">
                        <div className='userpage_userPass_oo_1'>
                            <h4>Mật khẩu cũ</h4>
                        </div>
                        <div className='userpage_userPass_oo_2'>
                            <input type="password" />
                        </div>
                    </div>
                    <div className="userpage_userPass_oo">
                        <div className='userpage_userPass_oo_1'>
                            <h4>Mật khẩu mới</h4>
                        </div>
                        <div className='userpage_userPass_oo_2'>
                            <input type="password" />
                        </div>
                    </div>
                    <div className="userpage_userPass_oo">
                        <div className='userpage_userPass_oo_1'>
                            <h4>Nhập lại mật khẩu</h4>
                        </div>
                        <div className='userpage_userPass_oo_2'>
                            <input type="password" />
                        </div>
                    </div>
                    <div className='userpage_user_button1'>
                        <button>Cập nhật</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Userpage