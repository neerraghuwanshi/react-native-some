import { createStackNavigator } from 'react-navigation-stack'

import UserDetail from '../screens/UserDetail'
import EditProfile from '../screens/EditProfile'
import Comments from '../screens/Comments'
import defaultNavOptions from "./defaultNavOptions"


export default UserDetailNavigator = createStackNavigator({
        UserDetail,
        EditProfile,
        Comments,
    },{
        defaultNavigationOptions:defaultNavOptions
    }
)