import React from 'react'
import { View } from 'react-native'
import {useSelector} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'

import PostList from '../components/PostList'
import UserDescription from '../components/UserDescription'
import Button from '../components/Button'

const UserDetail = (props) => {  
    
  const userData = useSelector(state => state.user.userProfile)
  const currentUsername = useSelector(state => state.auth.username)

  const editProfile = async() => {
    props.navigation.navigate({
      routeName:'EditProfile',
      params:{
        firstName: userData.first_name,
        lastName: userData.last_name,
        Bio: userData.bio,
        image: userData.image ? userData.image : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      }
    })
  }

  return (
      currentUsername ? 
      <PostList {...props}
          userDetail={currentUsername} 
          ListHeaderComponent={
            <UserDescription data={userData}>
              <View>
                <Button
                  title='Edit Profile'
                  onPress={editProfile}
                  />
                </View>
            </UserDescription>
          }
      /> :
      null
  )
}


UserDetail.navigationOptions = navData => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={
              'ios-menu'}
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
              />
        </HeaderButtons>)
}}

export default React.memo(UserDetail)
