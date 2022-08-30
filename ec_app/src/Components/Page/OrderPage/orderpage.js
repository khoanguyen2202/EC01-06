import React, { useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Orderpage() {
    const state = useContext(GlobalState)
    const [userInfo, setUserInfo] = state.userAPI.userInfo
    const [orders, setOrder] = useState([])

    useEffect(() => {
        var data = JSON.stringify({phonenumber: userInfo.phonenumber})
        var config = {
            method: 'post',
            url: 'https://aw-ec01-06.herokuapp.com/bills/phonenumber',
            headers: { 
              'Content-Type': 'application/json',
            },
            data: data
        }
        axios(config)
        .then(function (res) {
            setOrder(res.data.bills)
            console.log(res.data.bills);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])

    return (
        <div className="order_page">
            <h1>Đơn hàng</h1>
            <div className='order_page_product'>
                {orders.map(order => {
                    return (
                        <div className="order_product">
                            {
                                order.products.map(product => {
                                    return (
                                        <div className="order_product_detai">
                                            <div className="order_product_detail_left">
                                                <h4>x{product.quantity}</h4>
                                            </div>
                                            <div className="order_product_detail_right">
                                                <p>{product.product_id}</p> 
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Orderpage