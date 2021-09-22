import {useState,useEffect} from 'react'
import API from '../API'

const initState = {
    page:0,
    results:[],
    Total_pages:0,
    Total_results:0
}

export const useHomeFetch = () => {
    const [searchTerm,setSearchTerm]=useState('')
    const [state,setState]=useState(initState)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    console.log(searchTerm)
    const fetchMovies =async (page,searchTerm="")=>{
        try{
            setError(false)
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm,page)
            
            setState(prev=>({
                ...movies,
                results: page>1?[...prev.results,...movies.results]:[...movies.results]
            }))
        }
        catch(err){
            setError(true)
        }
        setLoading(false)
    }
    // inital search and searchterm
    useEffect(()=>{
        setState(initState)
        fetchMovies(1,searchTerm)
    },[searchTerm])

    return {state,loading,error,searchTerm,setSearchTerm}
}

