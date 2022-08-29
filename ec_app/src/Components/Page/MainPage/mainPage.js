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
import axios from 'axios'
import {useState, useEffect} from 'react'

function Main(){
    const [productsSale, setProduct] = useState([])
    const [productsTop, setProduct1] = useState([])

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get('http://localhost:5000/products/?sort=-discount&limit=20')
            const res1 = await axios.get('http://localhost:5000/products/?sort=-sold&limit=12')
            setProduct(res.data.products)
            setProduct1(res1.data.products)
        }
        getProducts()
    },[])
    let dollarUSLocale = Intl.NumberFormat('en-US');

    const showImg = (img) => {
        if (img.length === 0) {
            return (
                <img src="https://image.cellphones.com.vn/200x/media/catalog/product//s/m/sm-s901_galaxys22_front_pinkgold_211122.jpg" alt="" />
            )
        } else {
            return (
                <img src={img[0].url} alt="" />
            )
        }
    }
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
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className="slde"
                    >
                        {
                            productsSale.map(product => {
                                return (

                                        <SwiperSlide className="slide">
                                            <Link to={"/product/" + product._id} style={{textDecoration: 'none'}}>
                                                <div className="slide-promotion">
                                                    <span>Giảm {product.discount}%</span>
                                                </div>
                                                <div className="slide-img">
                                                    {showImg(product.images)}
                                                </div>
                                                <div className="slide-product-name">
                                                    <span>{product.productName}</span>
                                                </div>
                                                <div className="slide-price">
                                                    <span className="slide-price-promotion"> {dollarUSLocale.format(product.price * (1 - product.discount / 100))} đ</span>
                                                    <span className="slide-price-real"><del>{dollarUSLocale.format(product.price)}</del> đ</span>
                                                </div>
                                                <div className="rate"></div>
                                            </Link>
                                            
                                        </SwiperSlide>
                                )
                                
                            })
                        }
                        <></>
                    </Swiper>
                </div>
            

            </div>
            <div className="M_TopProduct">
                <div className="M_TopProduct_header">
                    <div className="top_Name">
                        <h1>Sản phẩm bán chạy</h1>
                    </div>  
                    <div className="top_watch">
                        <Link to="/show/all">
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
                            productsTop.map(product => {
                                return (
                                    <SwiperSlide className="slide">
                                        <Link to={"/product/" + product._id} style={{textDecoration: 'none'}}>
                                            <div className="slide-img">
                                                {showImg(product.images)}
                                            </div>
                                            <div className="slide-product-name">
                                                <span>{product.productName}</span>
                                            </div>
                                            <div className="slide-price">
                                                <span className="slide-price-promotion"> {dollarUSLocale.format(product.price * (1 - product.discount / 100))} đ</span>
                                                <span className="slide-price-real"><del>{dollarUSLocale.format(product.price)}</del> đ</span>
                                            </div>
                                            <div className="rate"></div>
                                        </Link>
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
                        <Link to="/show/category=Bàn%20phím" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k1} alt="" />
                            <p>Bàn Phím</p>
                        </Link>
                    </div>

                    <div className="M_img">
                        <Link to="/show/category=Tai%20nghe" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k2} alt="" />
                            <p>Tai nghe </p>
                        </Link>
                    </div>


                    <div className="M_img">
                        <Link to="/show/category=Chuột" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k3} alt="" />
                            <p>Chuột máy tính</p>
                        </Link>
                    </div>


                    <div className="M_img">
                        <Link to="/show/category=Sạc%20dự%20phòng" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k4} alt="" />
                            <p>Sạc dự phòng</p>
                        </Link>
                    </div>


                    <div className="M_img">
                        <Link to="/show/category=Bộ%20sạc" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k5} alt="" />
                            <p>Bộ sạc</p>
                        </Link>
                    </div>
                    
                </div>
                <div className="M_Menu_Category1">
                    <div className="M_img">
                        <Link to="/show/category=Webcame" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k6} alt="" />
                            <p>Webcam</p>
                        </Link>
                    </div>

                    <div className="M_img">
                        <Link to="/show/category=Ốp%20lưng" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k7} alt="" />
                            <p>Ốp lưng</p>
                        </Link>
                    </div>

                    <div className="M_img">
                        <Link to="/show/category=Giá%20đỡ" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k8} alt="" />
                            <p>Giá đỡ điện thoại</p>
                        </Link>
                    </div>

                    <div className="M_img">
                        <Link to="/show/category=Gậy%20selfie" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k9} alt="" />
                            <p>Gậy selfie</p>
                        </Link>
                    </div>

                    <div className="M_img">
                        <Link to="/show/category=Thiết%20bị%20mạng" style={{textDecoration: 'none', color: 'black'}}>
                            <img src={k10} alt="" />
                            <p>Thiết bị mạng</p>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main