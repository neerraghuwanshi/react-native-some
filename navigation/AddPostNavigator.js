import { createStackNavigator } from 'react-navigation-stack'

import AddPost from '../screens/AddPost'
import defaultNavOptions from "./defaultNavOptions";


export default AddPostNavigator = createStackNavigator(
    {
        AddPost: AddPost
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
)