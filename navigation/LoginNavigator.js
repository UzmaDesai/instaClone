import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {useFonts} from '@use-expo/font'

import Login from '../Screens/Auth/Login'
import SignUp from '../Screens/Auth/SignUp'
import Welcome from '../Screens/Auth/Welcome'
import StackNavigator from './StackNavigator'
import ProfilePicture from '../Screens/Auth/ProfilePicture'

const Stack = createStackNavigator()

export default function App(){
    // let [fontsLoaded] = useFonts({
    //     'Product-handlee' : require('../assets/fonts/Handlee-Regular.ttf')

    // })
    
    //     if (!fontsLoaded) {
    //         return <View  />
    //     }else {
            return(
        <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name = 'Welcome' component = {Welcome} options = {{headerShown:false}} />

                    <Stack.Screen name = 'Login' component = {Login} options = {{headerShown:false , title:'Login'}} />

                    <Stack.Screen name = 'SignUp' component = {SignUp} options = {{
                        headerStyle : {
                            backgroundColor :'#f5f5dc'
                        }
                        }}
                    />

                <Stack.Screen name = 'ProfilePicture' component = {ProfilePicture} options = {{
                        headerStyle : {
                            backgroundColor :'#f5f5dc'
                        }
                        }}
                />              

                    <Stack.Screen name = 'StackNavigator' component = {StackNavigator} options = {{headerShown:false}}/>


                </Stack.Navigator>
        </NavigationContainer>
            )
      //  }
        
    
}