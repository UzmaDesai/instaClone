/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import {Component }  from 'react'
 import React from 'react';
 import {
   StatusBar,
   StyleSheet,
   Text,
   View,
   Button,
   TouchableOpacity,
   Image,
   Dimensions,
   TextInput
 } from 'react-native';

//REDUCER IMPORTS
 import { bindActionCreators } from 'redux'
 import { connect } from 'react-redux'
 import { updateEmail,updatePassword,updateUsername,signup} from '../../actions/user'

 const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
 
 class SignUp extends React.Component {
 
  state = {
    repeat : '' //This is the repeat password
  }

  //Check if the 2 enetered passwords are identical or not
  onLoginPress = () => {
    if (this.props.user.password === this.state.repeat && this.props.user.username !== '') {
        this.props.signup()
        //alert('User has been signed up')
    }else{
      alert('Passcode are different')
    }
  }

 render(){
     
     return (
       <View style = {styles.container}>
       <Image source = {require('../../assets/backgrounds/background-white.jpg')} style = {{position:'absolute',zIndex:-1,width:screenWidth,height:screenheight+50}}/>

         <View style ={{width:screenWidth*0.9,marginTop:10}}>
                    <Text style={{left:15}}>Username</Text>
         </View>      
          <TextInput style = {{height:50,paddingHorizontal:20,margin:20,borderRadius:10,borderColor:'grey',borderWidth:1,
                                width:screenWidth * 0.9,
                                color:'black'}}
                                placeholderTextColor = {'grey'}
                                placeholder = 'Your username' 
                                value = {this.props.user.username}
                                onChangeText = {input => this.props.updateUsername(input)}
           />

          <View style ={{width:screenWidth*0.9,marginTop:10}}>
                    <Text style={{left:15}}>Email</Text>
          </View>      
          <TextInput style = {{height:50,paddingHorizontal:20,margin:20,borderRadius:10,borderColor:'grey',borderWidth:1,
                                width:screenWidth * 0.9,
                                color:'black'}}
                                placeholderTextColor = {'grey'}
                                placeholder = 'example@example.com' 
                                value = {this.props.user.email}
                                onChangeText = {input => this.props.updateEmail(input)}
           />
                              

         <View style ={{width:screenWidth*0.9,marginTop:10}}>
               <Text style={{left:15}}>Password</Text>
         </View>
          <TextInput style = {{height:50, paddingHorizontal:20,margin:20,borderRadius:10,borderColor:'grey',borderWidth:1,
                                width:screenWidth * 0.9,
                                color:'black' }}
                                placeholderTextColor = {'grey'}
                                placeholder = 'passcode123' 
                                secureTextEntry={true}
                                value = {this.props.user.password}
                                onChangeText = {input => this.props.updatePassword(input)}

           />


        <View style ={{width:screenWidth*0.9,marginTop:10}}>
               <Text style={{left:15}}>Repeat Password</Text>
         </View>
          <TextInput style = {{height:50, paddingHorizontal:20,margin:20,borderRadius:10,borderColor:'grey',borderWidth:1,
                                width:screenWidth * 0.9,
                                color:'black' }}
                                placeholderTextColor = {'grey'}
                                placeholder = 'Repeat passcode123' 
                                secureTextEntry={true}
                                value = {this.state.repeat}
                                onChangeText = {input => this.setState({repeat :input})}

           />

          <TouchableOpacity style ={{width:screenWidth*0.6,height:50,borderRadius:30,backgroundColor:'#0095f6',justifyContent:'center',alignItems:'center',margin:30}}
                          onPress = {() => this.onLoginPress()}
          >
             <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Sign Up</Text>
          </TouchableOpacity>

       </View>       
     )
   }
 }
 
 const styles = StyleSheet.create({
     container : {
       flex:1,
       alignItems : 'center',
     }
 }
 
 )
 
 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail,updatePassword,updateUsername,signup},dispatch)
 }

 //Get data from reducer.
 const mapStateToProps = (state) => {
   return{
     user: state.user,
     post : state.post
    }
 }

 export default connect (mapStateToProps,mapDispatchToProps)(SignUp)
 