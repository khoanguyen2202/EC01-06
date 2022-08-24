// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useParams, Link} from 'react-router-dom'
import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios';

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

const wh = [
    {"id": "121", "name": "xin chao 1"},
    {"id": "122", "name": "xin chao 2"},
    {"id": "123", "name": "xin chao 3"},
    {"id": "124", "name": "xin chao 4"},
    {"id": "125", "name": "xin chao 5"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"},
    {"id": "126", "name": "xin chao 6"}
]
// const colors = ["Đỏ", "Vàng", "Hồng", "Đen", "Xanh lá", "Xanh dương", "Trắng"]


function Detailpage() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const params = useParams()
    const [product, setProduct] = useState({})
    const [num, setNumber] = useState(1)
    const [colors, setColor] = useState([])
    const [chooseNum, setChooseNum] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [warehouse, setWarehouse] = useState([])
    const [urlImg, seturlImg] = useState([])
    const [img, setImg] = useState("")


    const increaseNum = () => {
        if (num < quantity) {
            setNumber(num + 1)
        }
    }
    const decreaseNum = () => {
        if (num > 1) {
            setNumber(num - 1)
        }
    }
    const KkHtml = () => {
        if (product.discount === 0) {
            return (
                <h3>{dollarUSLocale.format(product.price)}đ</h3>
            )
        } else {
            return (
                <>
                    <h3 className="Product_Name_dt_2_h1">{dollarUSLocale.format(product.price)}đ</h3>
                    <h3>{dollarUSLocale.format(product.price * ( 1 - product.discount))}</h3>
                </>
            )
        }
    }
    const changeValue = (v, cl) => {
        setChooseNum(cl.color)
        setQuantity(cl.quantity)
    }


    const colorShow = () => {
        if (Object.keys(product).length === 0) {
            return (
                <></>
            )
        } else {
            return (
                product.colors.map(cl => {
                    return (
                        <div  className="Product_Name_dt_4_color" 
                              style={{backgroundColor: (cl.color === chooseNum)? "red": "", color: (cl.color === chooseNum)? "white": "" }} 
                              onClick={(e) => changeValue(e, cl)}>{cl.color}
                        </div>
                    )
                })
            )
        }
    }

    useEffect(() =>{
        const getDetailProduct = async () => {
            const res = await axios.get('http://192.168.165.80:5000/products/?_id=' + String(params.id))
            setProduct(res.data.products[0]);
            seturlImg(res.data.product[0].images);
        }
        getDetailProduct()
    },[])   

    const showImage = () => {
        if (Object.keys(product).length === 0) {
            return (
                <img src="" alt=""/>
            )
        } else {
           if (Object.keys(product.images).length === 0) {
                return (
                    <img src="" alt=""/>
                )
           } else {
                console.log(product.images);
                return (
                    // <img src={product[0].images[0].url} alt=""/>
                    <img src={product[0].images[0].url} alt=""/>
                )
           }
        }
    }


    return (

        <div className="Detailpage">
            <div className="Dpage_Product">
                <div className="Dpage_Product_left">
                    <div className="pl_img">
                        <div className="pl_img_tt">
                            {showImage()}
                        </div>
                    </div>
                    <div className="pl_img_list">
                        <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={5}
                        slidesPerView={5}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className="slde"
                        >
                            {
                                data.map(user => {
                                    return (
                                    <SwiperSlide key={user.id} className="slide1">
                                        <div className="slide-img1">
                                            <img src="https://cdn2.cellphones.com.vn/50x/media/catalog/product/i/p/iphone-13-05.jpg" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    )
                                })
                            }
                            <></>
                        </Swiper>
                    </div>
                </div>
                <div className="Dpage_Product_right">
                    <div className="Product_Name_dt_1">
                        <span>{product.productName}</span>
                        <p>{product.sold} đã bán sản phẩm</p>
                    </div>
                    <div className="Product_Name_dt_2">
                        {KkHtml()}
                    </div>
                    <div className="Product_Name_dt_3">
                        <div className="Product_Name_dt_3_SL">
                            <p>Số lượng</p>
                        </div>
                        
                        <div className='Product_Name_dt_3_button_12'>
                            <button className='Product_Name_dt_3_button_12_left' onClick={decreaseNum}>-</button>
                            <div>{num}</div>
                            <button className='Product_Name_dt_3_button_12_right' onClick={increaseNum}>+</button>
                        </div>
                    </div>

                    <div className="Product_Name_dt_4">
                        {colorShow()}
                        
                    </div>
                    <div className="Product_Name_dt_5">
                        <div>
                            <button className="Product_Name_dt_5_buy"><h3>Đặt Mua</h3></button>
                        </div>
                        <div>
                            <button className="Product_Name_dt_5_add"><h3>Thêm vào giỏ hàng</h3></button>
                        </div>
                    </div>
                </div>
                <div className="Dpage_Product_WH">
                    <p>Có 11 cửa hàng có sản phẩm</p>
                    <div className="Dpage_WH_list">
                        {
                            wh.map(value => {
                                return (
                                    <div className="WH_list">
                                        <div className="WH_list_img">
                                            <img src="https://billiardshoanthuy.vn/wp-content/uploads/2017/04/ICON-PHONE-CALL.png" alt=""/>
                                        </div>
                                        <div className='WH_list_phone'>
                                            02871066288
                                        </div>
                                        <div className="WH_list_add">
                                            <span>359 Lê Đại Hành, P.11, Quận 11</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


            </div>
            <div className="Dpage_TT">
                <div className="Dpage_Name">
                    {/* <h2>Sản phẩm tương tự</h2> */}
                    <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                </div>
                
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={5}
                    navigation
                    pagination={{
                        el: '.my-custom-pagination-divtt',
                        clickable: true,
                        renderBullet: (index, className) => {
                         return '<span class="' + className + '"></span>';
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
                ...
                </Swiper>
                
            </div>
            <div className="DPage_D">
                <div className="Dpage_Demonstration_1">
                    <div className='Dpage_Demonstration_1_header'>
                        <h2>Mô tả sản phẩm</h2>
                    </div>
                    {/* <div className='Dpage_Demonstration_1_body'></div> */}

                </div>
                <div className="Dpage_Demonstration_2">
                    <h2>Thông số kĩ thuật</h2>
                    <div className="Dpage_Demonstration_2_body"></div>
                </div>
            </div>
        </div>
    )
}

export default Detailpage