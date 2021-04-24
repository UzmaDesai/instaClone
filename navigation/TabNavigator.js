import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../Screens/TabScreens/HomeScreen'
import SearchScreen from '../Screens/TabScreens/SearchScreen'
import PostScreen from '../Screens/TabScreens/PostScreen'
import NotificationScreen from '../Screens/TabScreens/NotificationScreen'
import ProfileScreen from '../Screens/TabScreens/ProfileScreen'
import { Platform } from 'react-native';

import {FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome , faSearch ,faPlusCircle ,faBell ,faUser} from '@fortawesome/free-solid-svg-icons'


const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  const instaBlue = '#0095f6'
  return (
    <Tab.Navigator
     barStyle ={ (Platform.OS == 'ios') ?
    {backgroundColor: "#f5f5dc",height : 56,bottom : 10}
    :
    {backgroundColor: "#f5f5dc",height : 56,}

   } > 

      <Tab.Screen name="Home" component={HomeScreen} 
      options = {{
        tabBarLabel : 'Home',
        tabBarIcon : () => (
          <FontAwesomeIcon icon={ faHome } color = {instaBlue} size={ 22 } />
        )
      }}
      />
      <Tab.Screen name="Search" component={SearchScreen}
      options = {{
        tabBarLabel : 'Search',
        tabBarIcon : () => (
          <FontAwesomeIcon icon={ faSearch } color = {instaBlue} size={ 22 } />
        )
      }}
       />
      <Tab.Screen name="Post" component={PostScreen}
      options = {{
        tabBarLabel : 'Post',
        tabBarIcon : () => (
          <FontAwesomeIcon icon={ faPlusCircle } color = {instaBlue} size={ 22 } />
        )
      }}
       />
      <Tab.Screen name="Notification" component={NotificationScreen} 
      options = {{
        tabBarLabel : 'Notification',
        tabBarIcon : () => (
          <FontAwesomeIcon icon={ faBell } color = {instaBlue} size={ 22 } />
        )
      }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options = {{
        tabBarLabel : 'Profile',
        tabBarIcon : () => (
          <FontAwesomeIcon icon={ faUser } color = {instaBlue} size={ 22 } />
        )
      }}
      />

    </Tab.Navigator>
  );
}