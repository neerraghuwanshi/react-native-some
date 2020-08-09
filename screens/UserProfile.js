import React from 'react'
import {  View, AsyncStorage } from 'react-native'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../components/Button'
import PostList from '../components/PostList';
import { FollowProfile } from '../store/actions/profileFunctions';
import UserDescription from '../components/UserDescription';
import { HOST_URL } from '../settings';

function UserProfile(props) {  

    const username = props.navigation.getParam('username')
    const currentUsername = useSelector(state => state.auth.username)
    const userData = useSelector(state => state.profile.profile)
    const dispatch = useDispatch()

    const messageHandler = async() => {
        const token = await AsyncStorage.getItem('token') 
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.post(`${HOST_URL}/chat/create/`,{
            messages:[],
            participants: [currentUsername,username]
        })
        .then(response => {
            props.navigation.navigate({
                routeName:'Chat',
                params: {
                    chatId: response.data.id,
                    currentUsername:currentUsername,
                    username:username
                }
            })
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        userData ?  
        <PostList {...props}
            userProfile={username} 
            ListHeaderComponent={
                <UserDescription data={userData}>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Button
                        title={
                            userData.is_following ?
                            'Unfollow' :
                            'follow'
                        } 
                        onPress={
                            ()=>dispatch(FollowProfile(username))
                        }/>
                    <Button
                        title='Message'
                        onPress={messageHandler}/>
                    </View>
                </UserDescription>
            }/> :
        null
    )
}

export default React.memo(UserProfile)