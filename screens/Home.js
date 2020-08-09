import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import PostList from '../components/PostList';

const Home = (props) => <PostList {...props}/>

export default Home

Home.navigationOptions = navData => {
    return {
      headerTitle:'ADDEARN',
      headerRight:()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Chat"
            iconName={
                'md-send'}
            onPress={() => {
              navData.navigation.navigate('Chats');
            }}
          />
        </HeaderButtons>)
}}