import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator} from 'react-navigation-tabs'

import { windowWidth } from '../constants/screenSize'
import Colors from '../constants/Colors';
import UserDetailNavigator from "./UserDetailNavigator";
import AddPostNavigator from "./AddPostNavigator";
import SearchNavigator from "./SearchNavigator";
import PostNavigator from "./PostNavigator";


const iconSize = windowWidth/20


const tabScreenConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarColor: Colors.primaryColor,
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons 
                        name="ios-home" 
                        size={iconSize} 
                        color={tabInfo.tintColor}/>
                )
            },
        }
    },
    Searchs: {
        screen: SearchNavigator,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarColor: Colors.accentColor,
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons 
                        name="ios-search" 
                        size={iconSize} 
                        color={tabInfo.tintColor}/>
                );
            },
        }
    },
    AddPosts: {
        screen: AddPostNavigator,
        navigationOptions: {
            tabBarLabel: 'Add',
            tabBarColor: Colors.accentColor,
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons 
                        name="ios-add" 
                        size={iconSize*1.2} 
                        color={tabInfo.tintColor} />
                )
            },
        }
    },
    UserDetails: {
        screen: UserDetailNavigator,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarColor: Colors.accentColor,
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons 
                        name="ios-man" 
                        size={iconSize*1.05} 
                        color={tabInfo.tintColor}/>
                )
            },
        }
    },
};


export default BottomTabNavigator = createBottomTabNavigator(
    tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: 'purple',
            labelStyle: {
                fontFamily:'open-sans',
                fontSize: windowWidth/30,
            },
        }
    }
);