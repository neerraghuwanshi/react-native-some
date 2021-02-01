import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

import { 
    setHomePosts, 
    setHomePage,
} from './home';
import { 
    setUserPosts, 
    setUserPage, 
    setUserProfile,
} from './user';
import { 
    setProfilePosts, 
    setProfilePage, 
    setProfile,
} from './profile';


export const AUTHERROR = 'AUTHERROR'
export const AUTHSUCCESS = 'AUTHSUCCESS'
export const AUTHSTART = 'AUTHSTART'
export const LOGOUT = 'LOGOUT'

export const authSuccess = (token, username) => {
    return {
        type: AUTHSUCCESS,
        token,
        username,
    }
}

export const authError = error => {
    return {
        type: AUTHERROR,
        error,
    }
}

export const authStart = () => {
    return {
        type: AUTHSTART,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const Login = (username, password, navigation) => {
    return async dispatch => {
        try {
            await dispatch(authStart())
            const response = await axios.post(
                'http://127.0.0.1:8000/dj-rest-auth/login/',{
                    username,
                    password,
                }
            )
            if (response.status !== 200){
                throw new Error(response.text)
            }
            await AsyncStorage.setItem('token', response.data.key)
            await AsyncStorage.setItem('username', username)
            await dispatch(authSuccess(response.data.key, username))
            await navigation.navigate('DrawerNavigator')
        } catch (error) { 
            // console.log(error.response.data)
            await dispatch(authError(error))
            if(error.message === 'Network Error'){
                Alert.alert('Network Error', "An Error Occured", [{text:'Ok'}])
            }
            else if(error.message === "Request failed with status code 400"){
                Alert.alert('Check Login Credentials', "Incorrect Username or Password", [{text:'Ok'}])
            }
        }
    }
}

export const SignUp = (username, email, password, firstName, lastName, navigation) => {
    return async dispatch => {
        try {
            await dispatch(authStart())
            const response = await axios.post(
                'http://127.0.0.1:8000/dj-rest-auth/registration/',{
                    username,
                    email,
                    password1: password,
                    password2: password,
                    first_name: firstName,
                    last_name: lastName
                }
            )
            if (response.status !== 201){
                throw new Error(response.data)
            }
            await AsyncStorage.setItem('token', response.data.key)
            await AsyncStorage.setItem('username', username)
            await dispatch(authSuccess(response.data.key, username))
            await navigation.navigate('DrawerNavigator')
        } catch (error) {
            console.log(error.response.data)
            if(error.response.data.username){
                Alert.alert('Sorry!', error.response.data.username[0], [{text:'Ok'}])
            }
            else if(error.response.data.email){
                Alert.alert('Sorry!', error.response.data.email[0], [{text:'Ok'}])
            }
            await dispatch(authError(error))
        }
    }
}

export const Logout = () => {
    return async dispatch => {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('username')
        dispatch(logout())
        dispatch(setHomePosts(null))
        dispatch(setHomePage(null))
        dispatch(setUserPosts(null))
        dispatch(setUserProfile(null))
        dispatch(setUserPage(null))
        dispatch(setProfilePosts(null))
        dispatch(setProfile(null))
        dispatch(setProfilePage(null))
    }
}