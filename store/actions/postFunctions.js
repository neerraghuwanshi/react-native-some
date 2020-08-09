import { Alert } from 'react-native'
import axios from 'axios'
import {addHomePost, deleteHomePost} from './home'
import {addUserPost, deleteUserPost, increasePosts, decreasePosts} from './user'
import { likeProfilePost } from './profile'
import { likeHomePost } from './home'
import { likeUserPost } from './user'


export const CreatePost = (image, caption, navigation) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const data = new FormData();
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:8000/post/create/", true);
            if(image){
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                data.append("image",{
                    name: 'image.png',
                    filename :'imageName.png',
                    type: image.type,
                    uri: 
                    Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
                });
            }
            if(!image && caption){
                xhr.setRequestHeader("Content-Type", "Application/json");
            }
            xhr.setRequestHeader("Authorization", `Token ${token}`);
            if(caption){
                data.append("caption",caption)
            }

            xhr.onreadystatechange = async () => {
                if(xhr.readyState == 4 && xhr.status == 201){
                    await dispatch(addHomePost(JSON.parse(xhr.responseText)))
                    await dispatch(addUserPost(JSON.parse(xhr.responseText)))
                    await dispatch(increasePosts())
                    await navigation.navigate('Home')
                }
                else if(xhr.readyState == 4 && xhr.status != 201){
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
            const response = await axios.delete(`http://127.0.0.1:8000/post/detail/${id}/`)
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
            const response = await axios.get(`http://127.0.0.1:8000/post/detail/${id}/?action=${is_liked ? 'unlike' : 'like'}`)
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