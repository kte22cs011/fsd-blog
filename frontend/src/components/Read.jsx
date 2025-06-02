import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


const Read = () => {
    const [data,setData]=useState([])
    const [error,setError]=useState(null)
    
    const baseUrl=import.meta.env.VITE_API_BASE_URL
    console.log(baseUrl)
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response = await axios.get(baseUrl) // fixed template literal error
                console.log(response.data)
                
                if (response.status !== 200) {
                    throw new Error('Failed to fetch blogs')
                }
                setData(response.data)
            } catch (error) {
                setError(error.message || "Server interaction failed")
            }
        }
        fetchData()
    },[])

    if(error) return <p>Error: {error}</p>
    return (
        <div>Read Blogs</div>
    )
}

export default Read