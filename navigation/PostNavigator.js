import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home'
import UserProfile from '../screens/UserProfile'
import Chats from '../screens/Chats'
import Chat from '../screens/Chat'
import Comments from '../screens/Comments'
import defaultNavOptions from "./defaultNavOptions";


export default PostNavigator = createStackNavigator({
        Home,
        UserProfile,
        Chats,
        Chat,
        Comments,
    },{
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons
                    name={
                        Platform.OS === 'android' ? 
                            'md-add' : 
                            'ios-add'
                    }
                    size={iconSize}
                    color={'purple'}/>
            )
        },
    }
)