import paypal_icon from './img/paypal.png'
import momo from './img/momo.png'
import pay from './img/pay.png'
import { Link } from "react-router-dom"
import {GlobalState} from '../../../GlobalState'
import React, { useContext, useState, useEffect} from 'react'
import axios from "axios"
import city from './show.json'


function Paymentpage() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const state = useContext(GlobalState)
    const [Cart, setCart] = state.Cart
    const [value, setValue] = useState(0.0)
    const [productList, setProductList] = useState([])
    const [user, setUser] = useState({
        name:'', phonenumber:'', email:'', address:''
    })
    const [City, setCity] = useState('')
    const [district, setDistricts] = useState('') 
    const [wards, setWards] = useState("")

    var array_id = []


    const onChangeInput= e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    useEffect(() => {
        if (Cart.length !== 0) {
            array_id = []
            for (let i = 0; i < Cart.length; i++) {
                array_id.push(Cart[i]._id)
            }
            var data = JSON.stringify({"_id": array_id})

            var config = {
                method: 'post',
                url: 'http://localhost:5000/products/list',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
            .then(function (res) {
                    setProductList(res.data.list)
            })
            .catch(function (error) {
                    console.log(error);
            });
            
        }
    }, [Cart])

    useEffect(() => {
        if ((Cart.length !== 0) && (productList.length !== 0)) {
            var tempt = 0.0
            for (let i = 0; i < Cart.length; i++) {
                tempt = tempt + Cart[i].quantity * productList[i].productPrice * (1 - productList[i].productDiscount / 100)
            }
            setValue(tempt)
        } else {
            setValue(0.0)
        }
    }, [productList])


    const showDistrict = () => {
        if (City === "") {
            return (
                <option value="" disabled selected>Quận /Huyện</option>
            )
        } else {
            const tempt = city["data"].filter((obj, index) => {
                return (obj.name === City)
            })
            return (
                tempt[0].districts.map(obj => {
                    return (
                        <option value={obj.name}>{obj.name}</option>
                    )
                })
            )
        }
    }

    const showAward = () => {
        if (district === "") {
            return (
                <option value="" disabled selected>Phường /Xã</option>
            )
        } else {
            const tempt = city["data"].filter((obj, index) => {
                return (obj.name === City)
            })
            const tempt1 = tempt[0].districts.filter(obj => {
                return (obj.name === district)
            })
            return (
                tempt1[0].wards.map(obj => {
                    return (
                        <option value={obj.name}>{obj.name}</option>
                    )
                })
            )
        }
    }

    const setupCity= (e) => {
        setCity(e.currentTarget.value)
        setDistricts("")
        setWards("")
    }
    const setupDistrict = (e) => {
        setDistricts(e.currentTarget.value)
        setWards("")    
    }

    return (
        <div className="paymentPage">
            <div className="payment_info">
                <h2>Thông tin đặt hàng</h2>
                <div className="payment_input">
                    <div className="payment_input_1">
                        <p>Thông tin khách hàng</p>
                        <div className="payment_value">
                            <input  name="name" value={user.name} onChange={onChangeInput}  placeholder="Họ và tên (bắt buộc)"/>
                        </div>
                        
                        <div className="payment_value">
                            <input name="phonenumber" value={user.phonenumber} onChange={onChangeInput} placeholder="Số điện thoại (bắt buộc)" />
                        </div>
                        <div className="payment_value">
                            <input name="email" value={user.email} onChange={onChangeInput} placeholder="Email (Vui lòng điền mail để nhận hóa đơn VAT)"/>
                        </div>
                    </div>
                    <div className="payment_input_1">
                        <p>Địa chỉ giao hàng</p>
                        <div className="payment_value">
                            <select onChange={(e) => {setupCity(e)}} placeholder="Thành phố / Tỉnh" value={City}>
                                {
                                    city["data"].map(obj => {
                                        return (
                                            <option value={obj.name}>{obj.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="payment_value">
                            <select onChange={(e) => {setupDistrict(e)}} value={district}>
                                {showDistrict()}
                            </select>
                        </div>
                        <div className="payment_value">
                            <select onChange={(e) => {setWards(e.currentTarget.value)}} value={wards}>
                                {showAward()}
                            </select>
                        </div>
                        <div className="payment_value">
                            <input name="address" value={user.address} onChange={onChangeInput} placeholder="Số nhà, tên đường"/>
                        </div>
                    </div>
                    <div className="payment_input_1">
                        <span>Phương thức thanh toán</span>
                        <div className="payment_aa">
                            <div className='payment_method'>
                                <img src={momo} alt="" />
                                <span className='Momo'>MOMO</span>
                            </div>
                            <div className='payment_method'>
                                <img src={paypal_icon} alt="" />
                                <span className='paypal'>PayPal</span>
                            </div>
                            <div className='payment_method'>
                                <img src={pay} alt="" />
                                <span className='pay'>Thanh toán sau khi nhận</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="payment_button">
                    <p>Thanh toán</p>
                </button>
            </div>
            <div className="payment_info_product">
                <div className="payment_info_product_detail">
                    <div className='p_value'>
                        <span className='p_value_left'>Đơn hàng</span>
                        <Link to="/cart">
                            <span className='p_value_right'>Thay đổi</span>
                        </Link>
                    </div>
                    <div className="p_value_1">
                        {productList.map((product, index) => {
                            return (
                                <div className="p_value_12">
                                    <div className='p_value_12_left'>
                                        <span> {Cart[index].quantity} x</span>
                                    </div>
                                    <div className='p_value_12_right'>
                                        <span>
                                            {product.productName + " - " + String(dollarUSLocale.format(product.productPrice * (1 - product.productDiscount / 100))) + ".đ"}
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                        )}

                    </div>
                    <div className="p_value_sum">
                        <span className='p_value_SUM_left'>Tổng tiền</span>
                        <span className='p_value_SUM_right'>{dollarUSLocale.format(value)} đ</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paymentpage