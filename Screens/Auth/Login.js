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
   TextInput,
   Dimensions,
   Image
 } from 'react-native';

 import { bindActionCreators } from 'redux'
 import { connect } from 'react-redux'
 import { updateEmail,updatePassword,login} from '../../actions/user'
 
const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const logoFont = require('../../assets/fonts/Handlee-Regular')

 class Login extends React.Component {
 
   render(){
    //TO SET THE TITLE OF THE HEADER
    //  this.props.navigation.setOptions({
    //    title : 'InstaClone'
    //  })

    return (
     <View style = {styles.container}>
       <Image source = {require('../../assets/backgrounds/background-white.jpg')} style = {{position:'absolute',zIndex:-1,width:screenWidth,height:screenheight+50}}/>
       <Text style ={{fontSize:30,fontFamily:'logoFont',marginVertical:60}}>Not-an-Insta-clone</Text>
        <View style ={{top:100}}>

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

        <View style= {{width:screenWidth,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style ={{width:screenWidth*0.6,height:50,borderRadius:30,backgroundColor:'#0095f6',justifyContent:'center',alignItems:'center'}}
                          onPress = {() => this.props.login()}
          >
             <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems:'center',flexDirection:'row',marginTop:10}}
                 onPress = {() => this.props.navigation.navigate('ProfilePicture')}
          >
              <Text style={{fontSize:18}}>Don't have an account? </Text> 
              <Text style={{fontSize:18,color:'#0095f6'}}>Sign up!</Text>
         </TouchableOpacity>
        </View>

        <View style={{bottom:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18}}>from </Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Uzma</Text>
        </View>
      </View>
    </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
     container : {
       flex:1,
       alignItems : 'center',
     }
 })

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail,updatePassword,login},dispatch)
 }

 //Get data from reducer.
 const mapStateToProps = (state) => {
   return{
     user: state.user,
     post : state.post
    }
 }

 export default connect (mapStateToProps,mapDispatchToProps)(Login)
 
 