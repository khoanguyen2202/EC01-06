import banner from './img/banner1.jpg'
import fire from './img/fire.svg'
import k1 from './img/key.png'
import k2 from './img/HeadPhone.png'
import k3 from './img/mount.png'
import k4 from './img/sac.png'
import k5 from './img/bosac.png'
import k6 from './img/webcame.png'
import k7 from './img/oplung.png'
import k8 from './img/giado.png'
import k9 from './img/gay.png'
import k10 from './img/mang.png'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const data = [
    {"id": "121", "name": "xin chao 1"},
    {"id": "122", "name": "xin chao 2"},
    {"id": "123", "name": "xin chao 3"},
    {"id": "124", "name": "xin chao 4"},
    {"id": "125", "name": "xin chao 5"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"}
  ]


function Main(){
    return (
        <div className="mainPage">
            <div className="M_Panner">
                <img src={banner} alt=""/>
            </div>
            <div className="M_Sale">
                <div className="M_Sale_Name">
                    <img src={fire} alt = ""/>
                    <h2>ON SALE</h2>
                    <img src={fire} alt = ""/>
                </div>
                <div className='M_sale_1'>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={55}
                        slidesPerView={5}
                        navigation
                        pagination={{
                            el: '.my-custom-pagination-div12',
                            clickable: true,
                            renderBullet: (index, className) => {
                             return '<span class="' + className + '"> </span>';
                            },
                        }}
                        // scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className="slde"
                    >
                        {
                            data.map(user => {
                                return (
                                <SwiperSlide key={user.id} className="slide">
                                    <div className="slide-promotion">
                                        <span>Giảm 25%</span>
                                    </div>
                                    <div className="slide-img">
                                        <img src="https://image.cellphones.com.vn/200x/media/catalog/product//s/m/sm-s901_galaxys22_front_pinkgold_211122.jpg" alt="" />
                                    </div>
                                    <div className="slide-product-name">
                                        <span>Samsung Galaxy S22 (8GB - 128GB)</span>
                                    </div>
                                    <div className="slide-price">
                                        <span className="slide-price-promotion">16.190.000 đ</span>
                                        <span className="slide-price-real"><del>21.999.000</del>đ</span>
                                    </div>
                                    <div className="rate"></div>
                                </SwiperSlide>
                                )
                                
                            })
                        }
                        <></>
                    </Swiper>
                    <div class="my-custom-pagination-div12" />
                </div>
            

            </div>
            <div className="M_TopProduct">
                <div className="M_TopProduct_header">
                    <div className="top_Name">
                        <h1>Sản phẩm bán chạy</h1>
                    </div>  
                    <div className="top_watch">
                        <Link to="/">
                            <h3>{"Xem tất cả"}</h3>
                        </Link>
                    </div>
                </div>
                <div className="M_TopProduct_product">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={5}
                        navigation

                        pagination={{
                            el: '.my-custom-pagination-div',
                            clickable: true,
                            renderBullet: (index, className) => {
                             return '<span class="' + className + '"> </span>';
                            },
                        }}

                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className="slde"
                    >
                        {
                            data.map(user => {
                                return (
                                <SwiperSlide key={user.id} className="slide">
                                    <div className="slide-img">
                                        <img src="https://image.cellphones.com.vn/200x/media/catalog/product//s/m/sm-s901_galaxys22_front_pinkgold_211122.jpg" alt="" />
                                    </div>
                                    <div className="slide-product-name">
                                        <span>Samsung Galaxy S22 (8GB - 128GB)</span>
                                    </div>
                                    <div className="slide-price">
                                        <span className="slide-price-promotion">16.190.000 đ</span>
                                        <span className="slide-price-real"><del>21.999.000</del>đ</span>
                                    </div>
                                    <div className="rate"></div>
                                </SwiperSlide>
                                )
                            })
                        }
                        
                    ...
                    </Swiper>
                    <div class="my-custom-pagination-div" />
                </div>
            </div>
            <div className="M_Sologan">
                <div className="sologan1">
                    <h2>Mua Sắm ở Accessosy World bạn được gì?</h2>
                </div>
                <div className="sologan2">
                    <div>
                        <h4>Mua sắm tiện lợi</h4>
                        <p>Mua sắm mọi thứ qua màn ảnh nhỏ của bạn, mọi nơi, mọi lúc.</p>
                    </div>
                    <div>
                        <h4>Ưu đãi ngập tràn</h4>
                        <p> Với những ưu đãi thường xuyên của chúng tôi, bạn sẽ có thể mua tất cả những thứ mà bạn mong ước với một mức giá không thể nào hời hơn.</p>
                    </div>
                    <div>
                        <h4>Giao hàng đúng hẹn</h4>
                        <p>Mọi đơn hàng được cam kết giao trong khoảng thời gian đã hẹn hoặc MIỄN PHÍ!!!</p>
                    </div>
                    <div>
                        <h4>Chăm sóc tận tâm</h4>
                        <p>Với chính sách bảo hành và dịch vụ chăm sóc khách hàng tận tâm, chúng tôi đảm bảo một chuyến mua sắm đầy an tâm cho bạn.</p>
                    </div>
                </div>
                <div className="sologan3">
                    <div>
                        <p>Chỉ cần bạn cần, chúng tôi sẽ bán.</p>
                    </div>
                    <div>
                        <p>What a steal!.</p>
                    </div>
                    <div>
                        <p>Chậm tay mất deal là lỗi bạn nhưng giao hàng trễ hẹn là lỗi chúng tôi</p>
                    </div>
                    <div>
                        <p>Hứa sẽ chăm sóc bạn tốt hơn cả người yêu cũ.</p>
                    </div>
                </div>

            </div>
            <div className="M_Menu">
                <div className="M_Menu_Name">
                    <h1>Danh mục sản phẩm</h1>
                </div>
                <div className="M_Menu_Category1">
                    <div className="M_img">
                        <img src={k1} alt="" />
                        <p>Bàn Phím</p>
                    </div>
                    <div className="M_img">
                        <img src={k2} alt="" />
                        <p>Tai nghe </p>
                    </div>
                    <div className="M_img">
                        <img src={k3} alt="" />
                        <p>Chuột máy tính</p>
                    </div>
                    <div className="M_img">
                        <img src={k4} alt="" />
                        <p>Sạc dự phòng</p>
                    </div>
                    <div className="M_img">
                        <img src={k5} alt="" />
                        <p>Bộ sạc</p>
                    </div>
                </div>
                <div className="M_Menu_Category1">
                <div className="M_img">
                        <img src={k6} alt="" />
                        <p>Webcam</p>
                    </div>
                    <div className="M_img">
                        <img src={k7} alt="" />
                        <p>Ốp lưng</p>
                    </div>
                    <div className="M_img">
                        <img src={k8} alt="" />
                        <p>Giá đỡ điện thoại</p>
                    </div>
                    <div className="M_img">
                        <img src={k9} alt="" />
                        <p>Gậy selfie</p>
                    </div>
                    <div className="M_img">
                        <img src={k10} alt="" />
                        <p>Thiết bị mạng</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main