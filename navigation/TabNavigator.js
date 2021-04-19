import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../Screens/TabScreens/HomeScreen'
import SearchScreen from '../Screens/TabScreens/SearchScreen'
import PostScreen from '../Screens/TabScreens/PostScreen'
import NotificationScreen from '../Screens/TabScreens/NotificationScreen'
import ProfileScreen from '../Screens/TabScreens/ProfileScreen'
import { Platform } from 'react-native';


const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
     barStyle ={ (Platform.OS == 'ios') ?
    {backgroundColor: "#f5f5dc",height : 56,bottom : 10}
    :
    {backgroundColor: "#f5f5dc",height : 56,}

   } > 


      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}