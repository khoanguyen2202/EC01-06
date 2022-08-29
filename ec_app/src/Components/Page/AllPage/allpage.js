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

import {useParams, Link} from 'react-router-dom'
import { useSearchParams } from "react-router-dom";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios'
import {useState, useEffect} from 'react'


function AllMain(){
    const [productsTop, setProduct1] = useState([])
    const params = useParams()

    useEffect(() =>{
        if (params.category !== undefined) {       
            const getProducts = async () => {
                const res1 = await axios.get('http://localhost:5000/products/?category=' + params.category)
                setProduct1(res1.data.products)
            }
            getProducts()
        } else
        if (params.name !== undefined) {     
            const getProducts = async () => {
                const res1 = await axios.get('http://localhost:5000/products/?productName[regex]=' + params.name)
                setProduct1(res1.data.products)
            }
            getProducts()
        } else {
            const getProducts = async () => {
                const res1 = await axios.get('http://localhost:5000/products/?limit=20')
                setProduct1(res1.data.products)
            }
            getProducts()
        }


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
    const showDiscount = (discount) => {
        if (discount === 0) {
            return (
                <></>
            )
        } else {
            return (
                <div className="slide-promotion">
                    <span>Giảm {discount}%</span>
                </div>
            )
        }
    }
    return (
        <div className="allPage">
            <div className="M_Panner">
                <img src={banner} alt=""/>
            </div>

            <div className="M_TopProduct">
                <div className="M_TopProduct_header">
                    <div className="top_Name_12">
                        <img src={fire} alt = ""/>
                            <h2 className='top_name_h'>Sản phẩm phụ kiện điện tử</h2>
                        <img src={fire} alt = ""/>
                    </div>  
                </div>
                <div className="M_TopProduct_product_all">
                    {
                        productsTop.map(product => {
                            return (
                                <div className="slide_all">
                                    <Link to={"/product/" + product._id} style={{textDecoration: 'none'}}>
                                        {showDiscount(product.discount)}
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
                                </div>
                            )
                        })
                    }
                </div>
            </div>
           
        </div>
    )
}

export default AllMain