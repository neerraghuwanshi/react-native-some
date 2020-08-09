import React, { useState, useCallback, useState } from 'react'

const fetch = useCallback(async (props) => {
    const token = await AsyncStorage.getItem('token')
    setIsRefreshing(true);
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    }
    await axios.get(`http://127.0.0.1:8000/${url}/`)
    .then(response=>{
        if (!response.data.next){
            setPage(null)
        }
        else setPage(2)
        setBlogs(response.data.results)
        setIsRefreshing(false)
    })
    .catch(error=>{
        setIsRefreshing(false)
        Alert.alert('Sorry!', error.message,[{text:'Ok'}])
    })
},[])

export default fetch