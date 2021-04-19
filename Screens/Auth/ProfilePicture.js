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
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image,
   Dimensions,
 } from 'react-native';
 var ImagePicker = require('react-native-image-picker');


//REDUCER IMPORTS
 import { bindActionCreators } from 'redux'
 import { connect } from 'react-redux'

 import { uploadPhoto } from '../../actions/index'
 import { updatePhoto } from '../../actions/user'

 const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
 
 class ProfilePicture extends React.Component {

    openLibrary = async () => {
     // try{
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        }
      
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(source);
                //this.state.image = source
                this.uploadProfilepic(source)
                
              }   
        }); 
        
    }

    uploadProfilepic = async (source) => {
      const url = await this.props.uploadPhoto(source.uri)
      console.log("uploaded url = "+url);
      this.props.updatePhoto(url)
    }
     
 render(){
    
     
     return (
        <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image source = {require('../../assets/backgrounds/background-white.jpg')} style = {{position:'absolute',zIndex:-1,width:screenWidth,height:screenheight+50}}/>
               
               <View style = {{justifyContent:'center',alignItems:'center',bottom:100}}>
               <Text style = {{fontWeight:'bold',fontSize:24,color:'black',margin:15}}>Choose a profile picture </Text>
                {
                    // (this.props.user.photo == undefined) ?
                    //     <TouchableOpacity
                    //         onPress = {() => this.openLibrary()}
                    //     >
                    //     <View style = {{width:screenWidth* 0.5,height:screenWidth * 0.5,borderRadius:screenWidth*0.25,backgroundColor:'beige'}}/>
                    //      </TouchableOpacity>
                    // :
                    //     <TouchableOpacity
                    //     onPress = {() => this.openLibrary()}
                    //     >
                            <Image 
                            source = {require('../../assets/backgrounds/background-white.jpg')}
                            style = {{width:screenWidth* 0.5,height:screenWidth * 0.5,borderRadius:screenWidth*0.25,backgroundColor:'beige'}}
                            />
                        //</TouchableOpacity>
                }

                <TouchableOpacity style = {{margin:25,padding:20,borderRadius:14,backgroundColor:'rgba(0,0,0,0.05)',width:screenWidth*0.9,alignItems:'center'}}
                onPress = {()=>{this.props.navigation.navigate('SignUp')}}
                >
                    <Text style = {{fontWeight:'bold',fontSize:24,color:'black'}}>Continue</Text>
                </TouchableOpacity>
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
 }
 
 )
 
 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({uploadPhoto,updatePhoto},dispatch)
 }

 //Get data from reducer.
 const mapStateToProps = (state) => {
   return{
     user: state.user,
     post : state.post
    }
 }

 export default connect (mapStateToProps,mapDispatchToProps)(ProfilePicture)
 