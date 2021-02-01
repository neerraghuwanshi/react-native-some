import React from 'react'
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { 
    createDrawerNavigator, 
} from 'react-navigation-drawer'

import { Logout } from '../store/actions/auth'
import BottomTabNavigator from "./BottomTabNavigator";

export default DrawerNavigator = createDrawerNavigator(
    {
        BottomTab: BottomTabNavigator,
    },
    {
        contentOptions: {
            activeTintColor: 'blue',
        },
        contentComponent: props => {
            const dispatch = useDispatch()
            const logout = () => {
                dispatch(Logout())
                props.navigation.navigate('ADDEARN')
            }
            return (
                <View 
                    style={{ 
                        flex: 1, 
                        justifyContent: "center",
                        alignItems:"center",
                    }}>
                    <View 
                        style={{
                            paddingHorizontal: 5,
                            borderColor: 'red',
                            borderWidth: 1,
                            borderStyle: 'solid',
                        }}>
                        <Button
                            title="Logout"
                            color={'red'}
                            onPress={logout}/>
                    </View>
                </View>
            )
        }
    }
);