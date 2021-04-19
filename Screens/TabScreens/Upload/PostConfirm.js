// import { Component } from 'react'
// import React from 'react';
// import {  View, TouchableOpacity, TextInput, Dimensions, Image,ScrollView} from 'react-native';

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// //import { getUser } from '../../../actions/user'
// import { updateDescription } from '../../../actions/post'

// const screenWidth = Dimensions.get("window").width
// const screenheight = Dimensions.get("window").height

// class PostConfirm extends React.Component {

//     render(){
//         return (
//             <View style={{flex:1, backgroundColor:'white', alignItems:'center'}}>

//                <Image source = {require('../../../assets/backgrounds/background-white.jpg')} style = {{position:'absolute',zIndex:-1,width:screenWidth,height:screenheight}}/>
               
//                {/*TEXT INPUT TO ENTER THE DESCRIPTION FOR THE PHOTOS TO BE UPLOADED  */}
//                <TextInput 
//                   placeholderTextColor = {'black'}
//                     placeholder = 'Type in your description here:' 
//                     value = {this.props.post.description}
//                     style = {{fontSize:20,paddingVertical : 10,
//                             paddingHorizontal:15,margin:20,backgroundColor:'rgba(0,0,0,0.05)',
//                         width:'95%',borderRadius:10}}
//                     onChangeText = {input => this.props.updateDescription(input)}
//                />

//                 <View>
//                     <ScrollView
//                     horizontal = {true}
//                      pagingEnabled = {true}   
//                     >
//                     {
//                       this.props.post.photos?.map(e=>
//                             <Image key = {e.id} source = {{uri:e}} style = {{width:screenWidth,height:360}} />
//                       )
//                     }  

//                     </ScrollView>
//                 </View>
//             </View>
//         );
//     }
// }

// //EXPORTING USING REDUCERS.
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ updateDescription}, dispatch)
// }
// const mapStateToProps = (state) => {
//     return{
//         user: state.user,
//         post: state.post
//     }
// }


// export default connect (mapStateToProps, mapDispatchToProps)(PostConfirm)



import React from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateDescription } from '../../../actions/post'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class PostConfirm extends React.Component {

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', alignItems:'center'}}>
            <Image source={require('../../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} />
                <TextInput 
                placeholderTextColor={'black'}
                placeholder={'Type in your description here :)'}
                onChangeText={input=>this.props.updateDescription(input)}
                value={this.props.post.description}
                style={{backgroundColor:'rgba(0,0,0,0.05)', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, width:'95%', borderRadius:10}}
                />
                
                <View>
                    <ScrollView
                    horizontal={true}
                    pagingEnabled={true} 
                    
                    >
                        {
                        this.props.post.photos?.map((e)=>
                            <Image key = {e} source={{uri: e}} style={{width:screenWidth, height:360, }} />
                        )
                        }

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
        
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(PostConfirm)











