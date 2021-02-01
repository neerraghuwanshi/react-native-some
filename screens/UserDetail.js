import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import Button from '../components/Button'
import PostList from '../components/PostList'
import UserDescription from '../components/UserDescription'


const UserDetail = (props) => {  
    
    const userData = useSelector(
        state => state.user.userProfile
    )
    const currentUsername = useSelector(
        state => state.auth.username
    )

    const editProfile = () => {
        props.navigation.navigate({
            routeName: 'EditProfile',
            params: {
                Bio: userData.bio,
                image: userData.image,  
                lastName: userData.last_name,
                firstName: userData.first_name,
            }
        })
    }

    return (
        currentUsername &&
        <PostList 
            {...props}
            userDetail={currentUsername} 
            ListHeaderComponent={
                <UserDescription data={userData}>
                    <View>
                        <Button
                            title='Edit Profile'
                            onPress={editProfile}/>
                    </View>
                </UserDescription>
            }/>
    )
}


export default React.memo(UserDetail)
