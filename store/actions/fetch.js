import axios from 'axios'
import { Alert } from 'react-native'

import { 
    FetchProfile, 
    FetchUserProfile 
} from './profileFunctions'
import { 
    setHomePosts, 
    setMoreHomePosts, 
    setHomePage 
} from './home'
import { 
    setUserPosts, 

    setMoreUserPosts, 
    setUserPage 
} from './user'
import { 
    setProfilePosts, 
    setMoreProfilePosts, 
    setProfilePage 
} from './profile'


export const FetchPosts = (userDetail, userProfile) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            username = userDetail || userProfile
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.get(
                `http://127.0.0.1:8000/post${
                    username ? 
                        '/username/' + username : 
                        ''
                }/`
            )
            if (response.status !== 200){
                throw new Error('Something went wrong!')
            }
            if(response.data.next){
                if(userDetail){
                    await dispatch(FetchUserProfile(userDetail))
                    await dispatch(setUserPosts(response.data.results))
                    await dispatch(setUserPage(2))
                }
                else if(userProfile){
                    await dispatch(FetchProfile(userProfile))
                    await dispatch(setProfilePosts(response.data.results))
                    await dispatch(setProfilePage(2))
                }
                else{
                    await dispatch(setHomePosts(response.data.results))
                    await dispatch(setHomePage(2)) 
                }
            }
            else{
                if(userDetail){
                    await dispatch(FetchUserProfile(userDetail))
                    await dispatch(setUserPosts(response.data.results))
                    await dispatch(setUserPage(null))
                }
                else if(userProfile){
                    await dispatch(FetchProfile(userProfile))
                    await dispatch(setProfilePosts(response.data.results))
                    await dispatch(setProfilePage(null))
                }
                else{
                    await dispatch(setHomePosts(response.data.results))
                    await dispatch(setHomePage(null)) 
                }
            }
        }
        catch (error) {
            Alert.alert('Sorry!', error.message,[{text:'Ok'}])
        }
    }
}

export const FetchMorePosts = (userDetail, userProfile) => {
    return async (dispatch, getState) => {
        const page = userDetail ? 
                        getState().user.userPage : 
                        userProfile ? 
                            getState().profile.profilePage :
                            getState().home.homePage
        if(page){
            try {
                const token = getState().auth.token
                const username = userProfile || userDetail
                axios.defaults.headers = {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                }
                const response = await axios.get(
                    `http://127.0.0.1:8000/post${
                        username ?
                            '/username/' + username : 
                            ''
                    }/?page=${page}`
                )
                if (response.status !== 200){
                    throw new Error('Something went wrong!')
                }
                if(response.data.next){
                    if(userDetail){
                        dispatch(setMoreUserPosts(response.data.results))
                        dispatch(setUserPage(page+1))
                    }
                    else if(userProfile){
                        dispatch(setMoreProfilePosts(response.data.results))
                        dispatch(setProfilePage(page+1))
                    }
                    else{
                        dispatch(setMoreHomePosts(response.data.results))
                        dispatch(setHomePage(page+1)) 
                    }
                }
                else{
                    if(userDetail){
                        dispatch(setMoreUserPosts(response.data.results))
                        dispatch(setUserPage(null))
                    }
                    else if(userProfile){
                        dispatch(setMoreProfilePosts(response.data.results))
                        dispatch(setProfilePage(null))
                    }
                    else{
                        dispatch(setMoreHomePosts(response.data.results))
                        dispatch(setHomePage(null)) 
                    }
                } 
            } catch (error) {
                Alert.alert('Sorry!', error.message,[{text:'Ok'}])
            }
        }
    }   
}