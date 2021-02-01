import React from 'react'
import { View } from 'react-native'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { HOST_URL } from '../settings';
import Button from '../components/Button'
import PostList from '../components/PostList';
import UserDescription from '../components/UserDescription';
import { FollowProfile } from '../store/actions/profileFunctions';


function UserProfile(props) {  

    const username = props.navigation.getParam('username')

    const currentUsername = useSelector(
        state => state.auth.username
    )
    const userData = useSelector(
        state => state.profile.profile
    )

    const dispatch = useDispatch()

    const messageHandler = async() => {
        try {
            const token = await AsyncStorage.getItem('token') 
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const response = await axios.post(
                `${HOST_URL}/chat/create/`,{
                    messages: null,
                    participants: [currentUsername,username],
                }
            )
            await props.navigation.navigate({
                routeName: 'Chat',
                params: {
                    chatId: response.data.id,
                    currentUsername: currentUsername,
                    username: username
                }
            })
        } catch (error) {   
            console.log(error);
        }
    }

    return (
        currentUsername &&  
        <PostList 
            {...props}
            userProfile={username} 
            ListHeaderComponent={
                userData &&<UserDescription data={userData}>
                    <View 
                        style={{
                            flexDirection:'row', justifyContent:'space-evenly',
                        }}>
                        <Button
                            title={
                                userData.is_following ?
                                'Unfollow' :
                                'follow'
                            } 
                            onPress={()=>{
                                dispatch(FollowProfile(username))
                            }}/>
                        <Button
                            title='Message'
                            onPress={messageHandler}/>
                    </View>
                </UserDescription>
            }/>
    )
}


export default React.memo(UserProfile)