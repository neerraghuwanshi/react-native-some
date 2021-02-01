import { createStackNavigator } from 'react-navigation-stack'

import defaultNavOptions from "./defaultNavOptions";
import Authentication from '../screens/Authentication';


export default AuthNavigator = createStackNavigator(
    {
      ADDEARN: Authentication
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
)