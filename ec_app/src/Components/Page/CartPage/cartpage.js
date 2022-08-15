import icon from "./img/icon.png"
import { Link } from "react-router-dom"

const product = [
    "1", "2", "3", "4", "5"
]
function Cartpage() {
    return (

        // // case 1: empty
        // <div className="Cartpage">
        //     <div className="cp_name">
        //         <h1>Giỏ hàng</h1>
        //     </div>
        //     <div className="cp_icon">
        //         <img src={icon} alt="" />
        //     </div>
        //     <div className="cp_note">
        //         <p>Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại</p>
        //     </div>

        //     <div className="cp_button">
        //         <Link to="/">
        //             <button><span>Quay lại trang chủ</span></button>
        //         </Link>
        //     </div>
        // </div>

        // case 2: products
        <div className="Cartpage">
            <div className="cp_name">
                 <h1>Giỏ hàng</h1>
            </div>
            <div className="cp_products">
                <div className="cp_product">
                    <div className="cp_product_img">
                        <img src="https://image.cellphones.com.vn/200x/media/catalog/product/_/0/_0004_layer_5_1.jpg" alt=""/>
                    </div>
                    <div className="cp_product_tt">
                        <div className="p_tt_name">
                            <span>Xiaomi Redmi Note 11-Xám</span>
                        </div>
                        <div className="p_tt_price">
                            <span className="p_tt_price_1">10.790.000₫</span>
                            <span className="p_tt_price_2">14.999.000₫</span>
                            <div>
                                <span>Giảm 20%</span>
                            </div>
                        </div>
                        <div className="p_tt_number">
                            <span>Chọn số lượng:</span>
                            <div className="p_tt_number_button">
                                <button>-</button>
                                <div>1</div>
                                <button>+</button>
                            </div>
                        </div>
                        <div className="p_tt_demo">
                            <div>- Thu cũ lên đời - Trợ giá 1 triệu</div>
                            <div>- [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ</div>
                        </div>
                    </div>
                </div>
                <div className="cp_product">
                    <div className="cp_product_img">
                        <img src="https://image.cellphones.com.vn/200x/media/catalog/product/_/0/_0004_layer_5_1.jpg" alt=""/>
                    </div>
                    <div className="cp_product_tt">
                        <div className="p_tt_name">
                            <span>Xiaomi Redmi Note 11-Xám</span>
                        </div>
                        <div className="p_tt_price">
                            <span className="p_tt_price_1">10.790.000₫</span>
                            <span className="p_tt_price_2">14.999.000₫</span>
                            <div>
                                <span>Giảm 20%</span>
                            </div>
                        </div>
                        <div className="p_tt_number">
                            <span>Chọn số lượng:</span>
                            <div className="p_tt_number_button">
                                <button>-</button>
                                <div>1</div>
                                <button>+</button>
                            </div>
                        </div>
                        <div className="p_tt_demo">
                            <div>- Thu cũ lên đời - Trợ giá 1 triệu</div>
                            <div>- [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ</div>
                        </div>
                    </div>
                </div>

                {/* button cart */}
                <div className="cart_button">
                    <div className="cart_button_value">
                        <span className="cart_button_value_1">Tổng tiền tạm tính:</span>
                        <span className="cart_button_value_2">42.670.000 ₫</span>
                    </div>
                    <div className="cart_button_1">
                        <button  className="cart_button_1_1"><span>Tiến Hành Đặt Hàng</span></button>
                    </div>
                    
                    <div className="cart_button_1">
                        <button className="cart_button_1_2">Chọn thêm sản phẩm khác</button>
                    </div>
                </div>
            </div>


           
        </div>
    )
}

export default Cartpage