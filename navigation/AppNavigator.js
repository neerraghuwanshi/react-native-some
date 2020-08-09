import React from 'react'
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useDispatch } from 'react-redux';

import Authentication from '../screens/Authentication';
import Home from '../screens/Home'
import AddPost from '../screens/AddPost'
import UserDetail from '../screens/UserDetail'
import UserProfile from '../screens/UserProfile'
import EditProfile from '../screens/EditProfile'
import Search from '../screens/Search'
import Chats from '../screens/Chats'
import Chat from '../screens/Chat'
import Colors from '../constants/Colors';
import {Logout} from '../store/actions/auth'
import { windowWidth } from '../constants/screenSize'


const iconSize = windowWidth/17

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTitleStyle: {
      fontFamily:'open-sans-bold',
      fontSize: windowWidth/23
    },
    headerBackTitleStyle: {

    },
    headerTintColor:'purple'
  };

const PostNavigator = createStackNavigator({
    Home: Home,
    UserProfile: UserProfile,
    Chats: Chats,
    Chat: Chat
},
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        size={iconSize}
        color={'purple'}
      />
    )
  },
    defaultNavigationOptions:defaultNavOptions
}
)

const AuthNavigator = createStackNavigator({
    ADDEARN: Authentication
},
{
    defaultNavigationOptions:defaultNavOptions
})


const AddPostNavigator = createStackNavigator({
  AddPost: AddPost
},
{
  defaultNavigationOptions:defaultNavOptions
})

const SearchNavigator = createStackNavigator({
  Search: Search,
  UserProfile: UserProfile,
  Chats: Chats,
  Chat: Chat
},
{
  defaultNavigationOptions:defaultNavOptions
})


const UserDetailNavigator = createStackNavigator({
  UserDetail: UserDetail,
  EditProfile: EditProfile
},
{
  defaultNavigationOptions:defaultNavOptions
})

const tabScreenConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-home" size={iconSize} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: 'AddEarn',
    }
  },
  Searchs: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-search" size={iconSize} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: 'Search'
    }
  },
  AddPosts: {
    screen: AddPostNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-add" size={iconSize} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: 'Add'
    }
  },
  UserDetails: {
    screen: UserDetailNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-man" size={iconSize} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: 'Profile',
    }
  }
};

const BottomTabNavigator = 
  createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily:'open-sans',
            fontSize: windowWidth/30,
            // marginHorizontal:5
          },
          activeTintColor: Colors.accentColor
        }
      });


const MainNavigator = createDrawerNavigator(
    {
      BottomTab: BottomTabNavigator,
    },
    {
      contentOptions: {
        activeTintColor: 'blue',
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
                title="Logout"
                color={'blue'}
                onPress={async () => {
                  dispatch(Logout());
                  props.navigation.navigate('ADDEARN')
                }}
              />
            </SafeAreaView>
          </View>
        );
      }
    }
  );

const AppNavigator = createSwitchNavigator({
    ADDEARN:AuthNavigator,
    MainNavigator:MainNavigator
},
{
    defaultNavigationOptions: defaultNavOptions
}
)


export default createAppContainer(AppNavigator)
