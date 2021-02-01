import { Alert } from 'react-native'
import axios from 'axios'

import { likeHomePost } from './home'
import { likeUserPost } from './user'
import { likeProfilePost } from './profile'
import { addHomePost, deleteHomePost } from './home'
import { 
    addUserPost, 
    deleteUserPost, 
    increasePosts, 
    decreasePosts 
} from './user'


export const CreatePost = (media, caption, navigation) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const data = new FormData()
            let xhr = new XMLHttpRequest()
            xhr.open(
                "POST", 
                "http://127.0.0.1:8000/post/create/", 
                true
            )
            if(media){
                xhr.setRequestHeader("Accept", "application/json")
                xhr.setRequestHeader("Content-Type", "multipart/form-data")
                type = media.type
                uri = media.uri
                const name = `${type}.${uri.substr(uri.lastIndexOf('.') + 1)}`
                data.append('media', {
                    name: name,
                    filename: 'file' + name,
                    type: type,
                    uri: Platform.OS === "android" ? 
                            media.uri : 
                            media.uri.replace("file://", "")
                });
            }
            if(!media && caption){
                xhr.setRequestHeader("Content-Type", "Application/json")
            }

            xhr.setRequestHeader("Authorization", `Token ${token}`)
            if(caption){
                data.append("caption", caption)
            }

            xhr.onreadystatechange =  () => {
                if(xhr.readyState == 4 && xhr.status == 201){
                    dispatch(addHomePost(JSON.parse(xhr.responseText)))
                    dispatch(addUserPost(JSON.parse(xhr.responseText)))
                    dispatch(increasePosts())
                    navigation.navigate('Home')
                }
                else if(xhr.readyState != 4 && xhr.status != 201){
                    throw new Error('Something went wrong!')
                }
            }
            xhr.send(data);
        }
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }
    }
}

export const DeletePost = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.delete(
                `http://127.0.0.1:8000/post/detail/${id}/`
            )
            if (response.status !== 204){
                throw new Error('Something went wrong!')
            }
            await dispatch(deleteHomePost(id))
            await dispatch(deleteUserPost(id))
            await dispatch(decreasePosts(id))
            
        }
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }
    }
}

export const LikePost = (id, is_liked) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.get(
                `http://127.0.0.1:8000/post/detail/${id}/?action=${
                    is_liked ?
                        'unlike' :
                        'like'
                }`
            )
            if (response.status !== 200){
                throw new Error('Something went wrong!')
            }
            dispatch(likeHomePost(id,response.data))
            dispatch(likeProfilePost(id, response.data))
            dispatch(likeUserPost(id, response.data))
        }
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }
    }
}


export const FetchComments = (id, setComments, page, setPage, setIsRefreshing) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.get(
                `http://127.0.0.1:8000/post/comments/${id}/?page=${page ? page : 1}`
            )
            if (response.status !== 200){
                throw new Error('Something went wrong!')
            }
            if (page > 1){
                await setComments(prev => prev.concat(response.data.results))
                await setPage(prev => prev + 1)
            }
            else{
                await setComments(response.data.results)
                setPage(2)
            }
            if (!response.data.next){
                await setPage(null)
            }
            if (setIsRefreshing){
                await setIsRefreshing(false)
            }
        }
        catch (error) {
            if (setIsRefreshing){
                setIsRefreshing(false)
            }
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }
    }
}


export const CreateComment = (id, comment, setComments) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.post(
                `http://127.0.0.1:8000/post/comments/create/`,{
                    id,
                    comment
                }
            )
            if (response.status !== 201){
                throw new Error('Something went wrong!')
            }
            setComments(prev => [response.data].concat(prev))
        }
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }
    }
}