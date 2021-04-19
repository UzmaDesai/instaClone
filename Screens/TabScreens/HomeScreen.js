import { Component } from 'react'
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'

const screenWidth = Dimensions.get("window").width
const screenheight = Dimensions.get("window").height

class HomeScreen extends React.Component {

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
               <Image source = {require('../../assets/backgrounds/background-white.jpg')} style = {{position:'absolute',zIndex:-1,width:screenWidth,height:screenheight}}/>

                <Text style={{fontSize:35, fontFamily:'logo-font', marginVertical:60, color:'#0095f6'}}>HomeScreen</Text>
            </View>
        );
    }
}

//EXPORTING USING REDUCERS.
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)







