// import {useState, useEffect} from 'react'
// import axios from 'axios'

// // Function: Call API to get data and return data
// function ProductsAPI() {
//     const [products, setProducts] = useState([])
//     const [callback, setCallback] = useState(false)
//     const [category, setCategory] = useState('')
//     const [sort, setSort] = useState('')
//     const [search, setSearch] = useState('')
//     const [page, setPage] = useState(1)
//     const [result, setResult] = useState(0)

//     useEffect(() => {
//         const getProducts = async () => {
//             const res = await axios.get('http://localhost:5000/')
//         }

//     }, [callback, sort, search, page, category])

// }