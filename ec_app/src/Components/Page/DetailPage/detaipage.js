// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useParams, Link} from 'react-router-dom'
import React, { useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios';


function Detailpage() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const params = useParams()
    const [product, setProduct] = useState({})
    const [num, setNumber] = useState(1)
    const [chooseNum, setChooseNum] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [warehouse, setWarehouse] = useState([])
    const [urlImg, seturlImg] = useState("")
    const [w, setW] = useState([])
    const [tt, setTT] = useState([])
    const state = useContext(GlobalState)
    const [Cart, setCart] = state.Cart



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
                    <h3>{dollarUSLocale.format(product.price * ( 1 - product.discount / 100))}đ</h3>
                </>
            )
        }
    }
    const changeValue = (v, cl) => {
        setChooseNum(cl.color)
        setQuantity(cl.quantity)
    }

    const changeUrlImage = (v, img) => {
        seturlImg(img)
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
        const setProduct = async () => {
            for (let i = 0; i < product.images.length; i++) {
                if (product.images[i].color === chooseNum) {
                    seturlImg(product.images[i].url)
                    break
                }
            }
        }
        const setWarehouse = () => {
            var count = 0
            var wh_info = []
            for (let i = 0; i < warehouse.length; i++) {
                // check product
                for (let j = 0; j < warehouse[i].products.length; j++) {
                    if (warehouse[i].products[j].color === chooseNum) {
                        count = count + 1
                        wh_info.push(warehouse[i]._id)
                        break
                    }
                }
            }
            return wh_info
        }
        const assginValue = async () => {
            const data = await setWarehouse()
            setW(data)
        }
        setProduct()
        assginValue()

    },[chooseNum, warehouse])


    useEffect(() =>{
        const setlProduct = async () => {
            setChooseNum(product.colors[0].color)
            setQuantity(product.colors[0].quantity)
        }
        const callWarehouse = async () => {
            const res = await axios.get('https://aw-ec01-06.herokuapp.com/warehouses/?product_id=' + product.product_id)
            setWarehouse(res.data.products)
        }
        const productTT = async () => {
            const res = await axios.get('https://aw-ec01-06.herokuapp.com/products/?limit=11&category=' + product.category)
            setTT(res.data.products)
        }
        

        callWarehouse()
        setlProduct()
        productTT()
        
    },[product])   

    useEffect(() =>{
        const getDetailProduct = async () => {
            
            const res = await axios.get('https://aw-ec01-06.herokuapp.com/products/?_id=' + String(params.id))
            setProduct(res.data.products[0]);
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
                if (urlImg === "") {
                    return (
                        <img src="" alt=""/>
                    )
                } else {
                    return (
                        <img src={urlImg} alt=""/>
                    )
                }
           }
        }
    }
    const showSmallImage = () => {
        if (Object.keys(product).length === 0) {
            return (
                <div className="pl_img_list"></div>
            )
        } else {
           if (Object.keys(product.images).length === 0) {
                return (
                    <div className="pl_img_list"></div>
                )
           } else {
                return (
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
                                product.images.map(img => {
                                    if (img.color.toLowerCase() === chooseNum.toLowerCase()) {
                                        return (
                                            <SwiperSlide className="slide1">
                                                <div className="slide-img1" onClick={(e) => changeUrlImage(e, img.url)}>
                                                    <img src={img.url} alt="" />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    } else {
                                        return (<></>)
                                    }
                                })
                            }
                            <></>
                        </Swiper>
                    </div>
                )
           }
        }
    }

    const showWarehouse = () => {
        return (
            <div className="Dpage_Product_WH">
                <p>Có {w.length} cửa hàng có sản phẩm</p>
                <div className="Dpage_WH_list">
                    {
                        w.map(value => {
                            return (
                                <div className="WH_list">
                                    <div className="WH_list_img">
                                        <img src="https://billiardshoanthuy.vn/wp-content/uploads/2017/04/ICON-PHONE-CALL.png" alt=""/>
                                    </div>
                                    <div className='WH_list_phone'>
                                        {value.hotline}
                                    </div>
                                    <div className="WH_list_add">
                                        <span>{value.address.street + ", " + value.address.ward + ", " + value.address.discount + ", " + value.address.city}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const showProductTT = () => {
        if (Object.keys(tt).length === 0) {
            return (
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
        
                </Swiper>
            )
        } else {
            return (
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
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    className="slde"
                >
                    {
                        tt.map(product => {
                            return (
                                <SwiperSlide className="slide">
                                    <Link to={"/product/" + product._id} onClick={()=>{window.location.href="/product/" + product._id}} style={{textDecoration: 'none'}}>
                                        <div className="slide-promotion">
                                            <span>Giảm {product.discount}%</span>
                                        </div>
                                        <div className="slide-img">
                                            {showImg12(product.images)}
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
            )
        }
    }

    const showfeature12 = () => {
        if (Object.keys(product).length === 0) {
            return (
                <div className="Dpage_Demonstration_2_body_center">
                    <div className="Dpage_Demonstration_2_body_left"></div>
                    <div className="Dpage_Demonstration_2_body_right"></div>
                </div>
            )
            
        } else {
            return (
                <div className="Dpage_Demonstration_2_body">
                    {Object.keys(product.feature).map(key => {
                        return (
                            <div className="Dpage_Demonstration_2_body_center">
                                <div className="Dpage_Demonstration_2_body_left">{key}</div>
                                <div className="Dpage_Demonstration_2_body_right">{product.feature[key]}</div>
                            </div>
                        )
                    })}
                </div>
            )
            
        }
    }

    const addCart = () => {
        let check = false
        for (let i = 0; i < Cart.length; i++) {
            if ((Cart[i]._id === product._id) && (Cart[i].color === chooseNum)) {
                check = true
                break
            }
        }
        
        if (check) {
            window.alert("Sản phẩm đã có trong giỏ hàng")
        } else {
            // add product into cart
            const tempt = [...Cart];
            tempt.push({"_id": product._id, "color": chooseNum, "quantity": num})
            setCart([...tempt])
            localStorage.setItem('cartuser', JSON.stringify(tempt))
        }

    }

    const showImg12 = (img) => {
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
        <div className="Detailpage">
            <div className="Dpage_Product">
                <div className="Dpage_Product_left">
                    <div className="pl_img">
                        <div className="pl_img_tt">
                            {showImage()}
                        </div>
                    </div>
                    {showSmallImage()}
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
                            <button className="Product_Name_dt_5_add" onClick={(e) => {addCart()}}><h3>Thêm vào giỏ hàng</h3></button>
                        </div>
                    </div>
                </div>
                {showWarehouse()}
            </div>
            <div className="Dpage_TT">
                <div className="Dpage_Name">
                    <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                </div>
                
                {showProductTT()}
                
                
            </div>
            <div className="DPage_D">
                <div className="Dpage_Demonstration_1">
                    <div className='Dpage_Demonstration_1_header'>
                        <h2>Mô tả sản phẩm</h2>
                    </div>
                    <div className='Dpage_Demonstration_1_body'>
                        {product.description}
                    </div>

                </div>
                <div className="Dpage_Demonstration_2">
                    <h2>Thông số kĩ thuật</h2>
                    {showfeature12()}
                </div>
            </div>
        </div>
    )
}

export default Detailpage