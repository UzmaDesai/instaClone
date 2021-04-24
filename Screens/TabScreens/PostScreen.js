import { Component } from 'react'
import React from 'react';
import {  Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image,Plastform} from 'react-native';
import { Permissions, Permission } from 'user-permissions';
//import ImagePicker from 'react-native-image-picker';
//import * as Progress from 'react-native-progress';
import { updateNextPhoto,removeImage ,uploadPost} from '../../actions/post'

import * as firebase from 'firebase'

var ImagePicker = require('react-native-image-picker');
import {FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//import storage from '@react-native-firebase/storage';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'

const screenWidth = Dimensions.get("window").width
const screenheight = Dimensions.get("window").height

class PostScreen extends React.Component {

  // const [image, setImage] = useState(null)
  // const [uploading, setUploading] = useState(false)
  // const [transferred, setTransferred] = useState(0)

state = {
  image : null,
  uploading : false,
  transferred : 0,

  //Variable to store the url for displaying on the image
  urlChosen : undefined
}

//CODE FOR IMAGE PICKING
   selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
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
            this.state.image = source
        //this.setState({url:source.uri})
            this.props.updateNextPhoto(source.uri)
            this.setState({urlChosen: source.uri })
            //setImage(source);
            this.uploadImage()
      }
    });
  };

//CODE TO UPLOAD THE IMAGE TO FIREBASE STORAGE
   uploadImage = async () => {
    const { uri } = this.state.image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    this.state.uploading = true // setUploading(true);
    this.state.transferred = 0 // setTransferred(0);
    let RandomNumber = Math.floor(Math.random() * 1000000000) + 1  
      let reference = firebase.storage().ref().child(`images/${RandomNumber}`);

      const response = await fetch(uploadUri);
      const blob = await response.blob();
      var newMetadata = {
        cacheControl: 'public,max-age=300',
        contentType: 'image/jpeg'
      };
    const task = reference.put(blob,newMetadata);
  
    // set progress state
    task.on('state_changed', snapshot => {
      // this.state.transferred(    
      //      Math.floor(Math.random() * 1000000000) + 1  
      // )
      // setTransferred(
      //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      // );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    this.state.uploading = false //setUploading(false);
    alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    this.state.image = null
  };

  changeChosenURL = (url) => {
    this.setState({urlChosen : url})
  }

  removeImage = (url) => {
      const position = this.props.post.photos.indexOf(url)
      this.props.removeImage(position)
      //SET THE NEXT CHOSEN URL AFTER REMOVING AN IMAGE
      if (this.props.post.photos?.length == 2){
        this.setState({urlChosen:this.props.post.photos[0]})
      }else {
          this.setState({urlChosen:undefined})
      }
  }

  uploadPost = () => {
    this.props.navigation.navigate("PostConfirm")
  }

  render(){
        return (
            <SafeAreaView style={ { flex:1,}}>
                  <Image source = {require('../../assets/backgrounds/background-white.jpg')} style = {{position:'absolute',zIndex:-1,width:screenWidth,height:screenheight}}/>

                {/* CODE FOR THE HEADER PART   */}
                <View style = {(Platform.OS == 'ios') 
                                    ? {width:screenWidth, height:55,borderBottomColor:'grey',borderBottomWidth:1} 
                                        : {width:screenWidth,height:55,borderBottomColor:'grey',borderBottomWidth:1,marginTop:30,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                
                <Text style={{margin:10,fontWeight:'bold',fontSize:22}}>Create a new post</Text>

                <TouchableOpacity
                  onPress = {() => this.uploadPost()}
                >
                    <Text style={{margin:10,fontWeight:'bold',fontSize:22,color:'blue'}}>Upload</Text>
                </TouchableOpacity>

                </View>

                {/* CODE FOR THE IMAGE */}
                <View style= {{width:screenWidth, height:360}}>
                    {
                    (this.state.urlChosen == undefined ) ?
                    //IF PHOTOS ARE NOT ADDED YET THEN SHOW A "+" ICON
                      <TouchableOpacity style = {{width:screenWidth,height:360,justifyContent:'center',alignItems:'center'}}
                      onPress = {() => this.selectImage()}
                      >
                             <View style = {{width:65,height:65,borderRadius:33,backgroundColor:'rgba(0,0,0,0.1)',justifyContent:'center',alignItems:'center'}}>
                                  <Text style = {{color:'white',fontSize:40}}>+</Text>
                              </View>
                      </TouchableOpacity>

                      :
                      //OR ELSE DISPLAY THE SELECTED IMAGE.
                      <View> 
                           <Image source={{uri : this.state.urlChosen}} style = {{width:screenWidth, height:360}}/>
                           <TouchableOpacity
                           onPress = {() => this.removeImage(this.state.urlChosen) } style = {{position:'absolute',bottom:30,right:40}}
                           >
                            <FontAwesomeIcon icon={ faTrash } size={ 35 } />

                           </TouchableOpacity>
                      </View>
                    }
                </View>

                <View style = {{flexDirection:'row',width:screenWidth,justifyContent:'center',alignItems:'center'}}>

                  {
                    (this.props.post.photos == undefined || this.props.post.photos?.length == 3 || this.props.post.photos?.length == 0 ) ?
                    null
                    :
                    <TouchableOpacity style = {{width:95,height:90,backgroundColor:'rgba(0,0,0,0.1)',justifyContent:'center',alignItems:'center',borderRadius:12,margin:5}}
                    onPress = {() => this.selectImage()}
                    >
                      <View style = {{width:40,height:40,borderRadius:20,backgroundColor:'rgba(0,0,0,0.1)',justifyContent:'center',alignItems:'center'}}>
                        <Text style = {{color:'white',fontSize:25}}>+</Text>
                      </View>
                    </TouchableOpacity>

                  }

                  {
                      this.props.post.photos?.map(e=>
                        //IF USER SELECTS ANY IMAGE THE CHANGE THE BIIGER IMAGE TO THE RESPECTIVE IMAGE.
                        <TouchableOpacity key = {e}
                          onPress = {() => this.changeChosenURL(e)}
                        >
                            <Image key = {e} source = {{uri:e}} style = {{width:95,height:90,backgroundColor:'rgba(0,0,0,0.1)',borderRadius:12,margin:5}} />
                        </TouchableOpacity>
                      )
                      
                    }  
                </View>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser,updateNextPhoto,removeImage,uploadPost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post : state.post
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(PostScreen)

//     launchImageLibrary = () => {
//         let options = {
//           storageOptions: {
//             skipBackup: true,
//             path: 'images',
//           },
//         };
//         ImagePicker.launchImageLibrary(options, (response) => {
//           console.log('Response = ', response);
    
//           if (response.didCancel) {
      //       console.log('User cancelled image picker');
      //     } else if (response.error) {
      //       console.log('ImagePicker Error: ', response.error);
      //     } else if (response.customButton) {
      //       console.log('User tapped custom button: ', response.customButton);
      //       alert(response.customButton);
      //     } else {
      //       const source = { uri: response.uri };

      //       // You can also display the image using data:
      //   // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      //   // alert(JSON.stringify(response));s

      //   let path = this.getPlatformPath(response).value;
      //   let fileName = this.getFileName(response.fileName, path);
      //   this.setState({ imagePath: path });
      //   const url = this.uploadImageToStorage(path, fileName);

      //       console.log('response', JSON.stringify(response));
      //       this.setState({
      //         filePath: response,
      //         fileData: response.data,
      //         fileUri: response.uri
      //       });
      //     }
      //   });
    
      // }
    

  // openLibrary = async () => {
    //     try {
    //         const { status } = await Permission.askAsync(Permissions.CAMERA_ROLL)
    //         if (status === 'granted') {
    //             const image = await ImagePicker.launchImageLibraryAsync({
    //                 allowsEditing : true
    //             })
    //             if(!image.cancelled) {
    //                 //const url = await this.props.uploadPhoto(image)
    //                 alert('image has been uploaded')
    //                 alert(image)

    //             }
    //         }
    //     }catch(e) {
    //         alert(e)
    //     }
    // }





