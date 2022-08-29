import React, {createContext, useState, useEffect} from 'react'
export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const [T_pages, setT_pages] = useState(1)
    const [cart, setCart] = useState([])

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            setToken(localStorage.getItem('token'))
        }
        if (localStorage.getItem("cartuser") === "") {
            setCart([])
        } else {
            setCart(JSON.parse(localStorage.getItem("cartuser")))
        }
    },[])
    //oke

    const state = {
        token: [token, setToken],
        Pages: [T_pages, setT_pages],
        Cart: [cart, setCart]
    }

    //oke
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}