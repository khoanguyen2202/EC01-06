import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('https://aw-ec01-06.herokuapp.com/customers/info', {
                        headers: {Authorization: token}
                    })
                    setUserInfo(res.data)
                    setIsLogged(true)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()   
        }
    },[token])

    return {
        isLogged: [isLogged, setIsLogged],
        userInfo: [userInfo, setUserInfo]
    }
}

export default UserAPI
 