import { Alert } from 'react-native'
import axios from 'axios'

import { setProfile } from './profile'
import { 
    increaseFollowing, 
    decreaseFollowing, 
    setUserProfile 
} from './user'


export const FetchProfile = (userProfile) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.get(
                `http://127.0.0.1:8000/userprofile/${userProfile}/`
            )
            if (response.status !== 200){
                throw new Error('Something went wrong!')
            }
            await dispatch(setProfile(response.data))
        } 
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }    
    }
}

export const FetchUserProfile = (userDetail) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.get(
                `http://127.0.0.1:8000/userprofile/${userDetail}/`
            )
            if (response.status !== 200){
                throw new Error('Something went wrong!')
            }
            await dispatch(setUserProfile(response.data))
        } 
        catch (error) {
            Alert.alert('Sorry!', error.message, [{text:'Ok'}])
        }    
    }
}

export const FollowProfile = (username) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const is_following = getState().profile.profile.is_following
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.get(
                `http://127.0.0.1:8000/userprofile/${username}/?action=${
                    is_following ? 
                        'unfollow' : 
                        'follow'
                }`
            )
            if (response.status !== 200){
                throw new Error('Something went wrong!')
            }
            dispatch(setProfile(response.data))
            is_following ?
                dispatch(decreaseFollowing()) :
                dispatch(increaseFollowing()) 
        } 
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }    
    }
}

export const UpdateProfile = (image, body, navigation) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const username = getState().auth.username
            let xhr = new XMLHttpRequest()
            xhr.open(
                "PATCH", 
                `http://127.0.0.1:8000/userprofile/${username}/`,
                true
            )
            const data = new FormData()
            if(image){
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                xhr.setRequestHeader("Accept", "application/json")

                data.append("image",{
                name: 'image.png',
                filename :'imageName.png',
                type: image.type,
                uri: 
                    Platform.OS === "android" ? 
                        image.uri : 
                        image.uri.replace("file://", "")
                });
                data.append('Content-Type', 'image/png');
            }

            Object.keys(body).forEach(key => {
                data.append(key, body[key]);
            });

            xhr.setRequestHeader("Authorization", `Token ${token}`)
            xhr.onreadystatechange = async () => {
                if(xhr.readyState == 4 && xhr.status == 200){
                    await dispatch(setUserProfile(JSON.parse(xhr.responseText)))
                    await navigation.goBack()
                }
                else if(xhr.status != 200){
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