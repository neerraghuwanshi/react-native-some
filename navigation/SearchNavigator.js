import { createStackNavigator } from 'react-navigation-stack'

import Search from '../screens/Search'
import UserProfile from '../screens/UserProfile'
import Chats from '../screens/Chats'
import Chat from '../screens/Chat'
import Comments from '../screens/Comments'
import defaultNavOptions from "./defaultNavOptions";


export default SearchNavigator = createStackNavigator({
        Search,
        UserProfile,
        Chats,
        Chat,
        Comments
    },{
        defaultNavigationOptions: defaultNavOptions
    }
)