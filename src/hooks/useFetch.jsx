import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)


    const fetchData = async () => {
        try {
          const response = await axiosInstance({method: "GET", url: url})

          setData(response?.data?.data)

          setIsLoading(false)
          
          console.log("Movie data: ", data);
          
        } catch (error) {
          
          console.log(error)
          setError(error)
          
        }
    }
      
    useEffect(()=>{

      fetchData()

    },[])

    return [data, isLoading, error]
    
}