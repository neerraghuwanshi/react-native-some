import { 
    createAppContainer, 
    createSwitchNavigator,
} from 'react-navigation';

import AuthNavigator from "./AuthNavigator";
import defaultNavOptions from "./defaultNavOptions";
import DrawerNavigator from "./DrawerNavigator";


const AppNavigator = createSwitchNavigator(
    {
        ADDEARN: AuthNavigator,
        DrawerNavigator: DrawerNavigator
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
)


export default createAppContainer(AppNavigator)
