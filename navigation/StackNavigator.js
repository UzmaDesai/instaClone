import React from 'react'
import { Component } from 'react'
import { TouchableOpacity,Text } from 'react-native'
import {FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'
import PostConfirm from '../Screens/TabScreens/Upload/PostConfirm'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { uploadPost,getPosts } from '../actions/post'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

class MyStack extends React.Component{

  uploadPost = () => {
    this.props.navigation.navigate('TabNavigator')
       alert('Posted')
       this.props.uploadPost()
       //this.props.getPosts()
  }

  render () {
    return (
      <Stack.Navigator>
          <Stack.Screen name="TabNavigator" component={TabNavigator} options = {{headerShown:false}}/>
          <Stack.Screen name="PostConfirm" component={PostConfirm} 
          options = {{
            headerShown:true, 
            headerTitle:'See your post',
            headerRight: () => (
              <TouchableOpacity style = {{margin:20,flexDirection:'row'}}
              onPress = {() => this.uploadPost()}
              >
                <Text style ={{color:'blue',fontWeight:'bold',fontSize:20,marginHorizontal:5,bottom:0}}>POST</Text>
                  <FontAwesomeIcon icon={faCheck} color= {'blue'} size={ 25 } style = {{top:2}} />
              </TouchableOpacity>
              
            ),
          }}
          />
        
      </Stack.Navigator>
    );
  }
}

//EXPORTING USING REDUCERS.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPost,getPosts }, dispatch)
}
const mapStateToProps = (state) => {
  return{
      user: state.user,
      post: state.post
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(MyStack)
