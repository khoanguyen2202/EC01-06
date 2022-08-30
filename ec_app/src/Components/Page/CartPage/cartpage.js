import icon from "./img/icon.png"
import { Link } from "react-router-dom"
import {GlobalState} from '../../../GlobalState'
import React, { useContext, useState, useEffect} from 'react'
import axios from "axios"

function Cartpage() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const state = useContext(GlobalState)
    const [Cart, setCart] = state.Cart
    const [value, setValue] = useState(0.0)
    const [productList, setProductList] = useState([])
    var array_id = []

    useEffect(() => {
        if (Cart.length !== 0) {
            array_id = []
            for (let i = 0; i < Cart.length; i++) {
                array_id.push(Cart[i]._id)
            }
            var data = JSON.stringify({"_id": array_id})

            var config = {
                method: 'post',
                url: 'https://aw-ec01-06.herokuapp.com/products/list',
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

    const showImg = (e) => {
        if (Object.keys(e).length === 0) {
            return (
                <img src="" alt=""/>
            )
        } else {
            return (
                <img src={e[0].url} alt=""/>
            )
        }
    }
    
    const increaseQuantity = (index, quantity) => {
        if (quantity.length >= 2) {
            const tempt = Cart
            var result = quantity.filter(obj => {
                return obj.color === Cart[index].color
            })

            if (parseInt(tempt[index].quantity) < result[0].quantity) {
                tempt[index].quantity = parseInt(tempt[index].quantity) + 1
                setCart([...tempt])
                localStorage.setItem('cartuser', JSON.stringify(Cart))
            }
        }
        if (quantity.length == 1) {
            const tempt = Cart
            if (parseInt(tempt[index].quantity) < quantity[0].quantity) {
                tempt[index].quantity = parseInt(tempt[index].quantity) + 1
                setCart([...tempt])
                localStorage.setItem('cartuser', JSON.stringify(Cart))
            }
        }
    }

    const decreaseQuantity = (index) => {
        const tempt = Cart
        if (parseInt(tempt[index].quantity) > 1) {
            tempt[index].quantity = parseInt(tempt[index].quantity) - 1
            setCart([...tempt])
            localStorage.setItem('cartuser', JSON.stringify(Cart))
        }
    }
    const removerProductCart = (index) => {
        const tempt = productList
        const tempt_V1 = Cart

        tempt.splice(index, 1)
        tempt_V1.splice(index, 1)

        setCart([...tempt_V1])
        localStorage.setItem('cartuser', JSON.stringify(Cart))
        setProductList([...tempt])
    }

    const showPrice = (price, discount) => {
        if (discount === 0) {
            <span className="p_tt_price_1">{dollarUSLocale.format(price * (1 - discount / 100))}đ</span>
        } else {
            return (
                <>
                    <span className="p_tt_price_1">{dollarUSLocale.format(price * (1 - discount / 100))}đ</span>
                    <span className="p_tt_price_2">{dollarUSLocale.format(price)}đ</span>
                    <div className="p_tt_price_3">
                        <span>Giảm {discount}%</span>
                    </div>
                </>
            )
        }

    }
    
    const showNumberProduct = (quantity, index) => {
        if (quantity.length >= 2) {
            var result = quantity.filter(obj => {
                return obj.color === Cart[index].color
            })

            if (result[0].quantity < 10) {
                return (
                    <div className="p_tt_sp">
                        <span>Còn {result[0].quantity} sản phẩm</span>
                    </div>
                )
            } else {
                return (
                    <></>
                )
            }
        }
        if (quantity.length == 2) {
            if (quantity[0].quantity < 10) {
                return (
                    <div className="p_tt_sp">
                        <span>Còn {quantity[0].quantity} sản phẩm</span>
                    </div>
                )
            } else {
                return (
                    <></>
                )
            }
        } 
    }

    const clickPayment = async() => {
        var data = JSON.stringify({"products": Cart})

        var config = {
            method: 'post',
            url: 'https://aw-ec01-06.herokuapp.com/payments/get',
            headers: { 
              'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
        .then(function (res) {
            window.location.href = res.data.link
        })
        .catch(function (error) {
            console.log(error);
        });
        window.location.href = "/cart/payment-info"
    }

    const showfeature = (productFeature) => {
        if (Object.keys(productFeature).length >= 3) {
            return (
                <div className="p_tt_demo">
                    {Object.keys(productFeature).slice(0, 3).map((key, index) => {
                        return (
                            <div key={index}>- {key} :  {productFeature[key]}</div>
                        )
                    })}
    
                </div>
            )
        }
        if (Object.keys(productFeature).length === 2) {
            return (
                <div className="p_tt_demo">
                    {Object.keys(productFeature).slice(0, 2).map((key, index) => {
                        return (
                            <div key={index}>- {key} :  {productFeature[key]}</div>
                        )
                    })}
    
                </div>
            )
        }
        if (Object.keys(productFeature).length === 1) {
            return (
                <div className="p_tt_demo">
                    {Object.keys(productFeature).slice(0, 1).map((key, index) => {
                        return (
                            <div key={index}>- {key} :  {productFeature[key]}</div>
                        )
                    })}
    
                </div>
            )
        }
        
    }

    const showCart = () => {
        if (productList.length === 0) {
            return (
                <div className="Cartpage">
                    <div className="cp_name">
                        <h1>Giỏ hàng</h1>
                    </div>
                    <div className="cp_icon">
                        <img src={icon} alt="" />
                    </div>
                    <div className="cp_note">
                        <p>Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại</p>
                    </div>
        
                    <div className="cp_button">
                        <Link to="/">
                            <button><span>Quay lại trang chủ</span></button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="Cartpage">
                    <div className="cp_name">
                        <h1>Giỏ hàng</h1>
                    </div>
                    <div className="cp_products">

                        {productList.map((product, index) => {
                            console.log(product);
                            return (
                                <div key={index} className="cp_product">
                                    <div className="cp_product_remove" onClick={(e) => {removerProductCart(index)}}>X</div>
                                    <div className="cp_product_img">
                                        {showImg(product.productURL)}
                                    </div>
                                    <div className="cp_product_tt">
                                        <div className="p_tt_name">
                                            <span>{product.productName + "- Màu sắc: " + Cart[index].color}</span>
                                        </div>
                                        <div className="p_tt_price">
                                            {showPrice(product.productPrice, product.productDiscount)}
                                            {showNumberProduct(product.productColors, index)}
                                            
                                        </div>
                                        <div className="p_tt_number">
                                            <span>Chọn số lượng:</span>
                                            <div className="p_tt_number_button">
                                                <button  onClick={(e) => {decreaseQuantity(index)}}>-</button>
                                                <div>{Cart[index].quantity}</div>
                                                <button onClick={(e) => {increaseQuantity(index, product.productColors)}}>+</button>
                                            </div>
                                        </div>
                                        {showfeature(product.productFeature)}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="cart_button">
                            <div className="cart_button_value">
                                <span className="cart_button_value_1">Tổng tiền tạm tính:</span>
                                <span className="cart_button_value_2">{dollarUSLocale.format(value)} đ</span>
                            </div>
                            <div className="cart_button_1">
                                <button  className="cart_button_1_1" onClick={(e) => {clickPayment()}}><span>Tiến Hành Đặt Hàng</span></button>
                            </div>
                            
                            <div className="cart_button_1">
                                <Link to="/">
                                    <button className="cart_button_1_2">Chọn thêm sản phẩm khác</button>
                                </Link>       
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {showCart()}
        </>
        
    )
}

export default Cartpage