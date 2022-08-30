import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './API/UserAPI'
import axios from 'axios'
export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const [T_pages, setT_pages] = useState(1)
    const [Cart, setCart] = useState([])

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        
        if(firstLogin){
            const refreshtoken = localStorage.getItem("refreshtoken")
            const refreshToken = async () =>{
                try {
                    const res = await axios.get('https://aw-ec01-06.herokuapp.com/customers/refresh_token/?refreshtoken=' + refreshtoken)
                    setToken(res.data.accesstoken)
                    localStorage.setItem('token', res.data.accesstoken)
                    setTimeout(() => {
                        refreshToken()
                    }, 10 * 60 * 1000)
                } catch (err) {
                    localStorage.setItem('firstLogin', false)
                    localStorage.setItem('refreshtoken', "")
                    setToken("")
                }
            }
            refreshToken()
        }
        if (localStorage.getItem("cartuser") === null) {
            localStorage.setItem('cartuser', "")
        }
        if (localStorage.getItem("cartuser") === "") {
            setCart([])
        } else {
            setCart(JSON.parse(localStorage.getItem("cartuser")))
        }
    },[])

    const state = {
        token: [token, setToken],
        Pages: [T_pages, setT_pages],
        Cart: [Cart, setCart],
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}