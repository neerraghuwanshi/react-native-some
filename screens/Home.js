import React from 'react'
import { 
    HeaderButtons, 
    Item 
} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton'
import PostList from '../components/PostList';


const Home = props => {

    return (
        <PostList {...props}/>
    )  
}


Home.navigationOptions = navData => {
    return {
        headerTitle:'Home',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Chat"
                    iconName='md-send'
                    onPress={() => {
                        navData.navigation.navigate('Chats');
                    }}/>
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName='md-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    }
}


export default Home