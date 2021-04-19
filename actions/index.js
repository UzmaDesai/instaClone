import * as firebase from 'firebase'
import db from '../config/Firebase'


// export const uploadPhoto = (image) => {
//     return async (dispatch) => {
//         var metadata = {
//             cacheControl : 'public,max-age=5000,s-maxage = 600'
//         }
//         let fileType = image.uri.split("/")
//         let length = fileType.length - 1
//         fileType = fileType[length].split(".")[1]

//         const resize = await ImageManipulator.manipulateAsync(image.uri, [],{
//             format: ImageManipulator.SaveFormat[fileType == "jpeg" || "jpg" ? "JPEG" :"PNG"],
//             compress:0.5,
//             base64:false
//         })
        
//         const response = await fetch(resize.uri)
//         const blob = response.blob()

//         const uploadTask = await firebase
//         .storage()
//         .ref()
//         .child(`images/${uuid.v4()}`)
//         .put(blob,metadata)

//         const downloadURL = await uploadTask.ref.getDownloadURL()
//         return downloadURL
//     }
// }


//CODE TO UPLOAD THE IMAGE TO FIREBASE STORAGE
export const uploadPhoto = (image) => {
     return async (dispatch) => {
        console.log("image in upload photo = "+image)
         const { uri } = image;
        //const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let RandomNumber = Math.floor(Math.random() * 1000000000) + 1  
        let reference = firebase.storage().ref().child(`images/${RandomNumber}`);
        console.log("Reference = +" + reference)
        console.log("uploadUri = +" + image)



        const response = await fetch(uri);
        console.log("Response = +" + response)
        const blob = await response.blob();
        var newMetadata = {
            cacheControl: 'public,max-age=300',
            contentType: 'image/jpeg'
        };
        const task = reference.put(blob,newMetadata);
  
    try {
      //await task;
      const downloadURL = task.ref.getDownloadURL()
      console.log("donwloaded url = "+downloadURL)
      return downloadURL
    } catch (e) {
      console.error(e);
    }
   

    alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );

        }

    
  };

  