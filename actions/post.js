
import * as firebase from 'firebase'
import db from "../config/Firebase"

export const updateDescription = (input) => {
	return {type:'UPDATE_DESCRIPTION', payload: input}
}

export const updateNextPhoto = (input) => {
 return async (dispatch,getState) => {
     try {
        let array = []
        const { post  } = getState()
        console.log("POST in UPDATENEXTPHOTO =" + post)

        post.photos?.forEach(photo => {
            array.push(photo)
        })
        array.push(input)
        dispatch({type:'UPDATE_POST_NEXT_PHOTO',payload:array})
     }catch(e){
         alert(e)
     }
 } 
}

export const removeImage = (photoToRemove) => {
    return async (dispatch,getState) => {
        try {
            let array = []
            const { post  } = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            })
            array.splice(photoToRemove,1) //splice means remove images or values from the array with value input and 1 = remove one value
            dispatch({type:'UPDATE_POST_NEXT_PHOTO',payload:array})

        }catch(e) {
            alert(e)
        }
    }
}

export const uploadPost = () => {
 return async (dispatch,getState) => {
     try {
        const { post, user } = await getState()
        console.log("POST = "+post)
        console.log("Users = "+ user)
        let RandomNumber = Math.floor(Math.random() * 100000000000) + 1  
        console.log("RandomNumber = "+ RandomNumber)
        const id = RandomNumber
        const upload = {
            id: id,   //id for the post to be uploaded
            uid: user.uid ,//id of the user
            photos: post.photos,
            username : user.username,
            date: new Date().getTime(),
            likes : [],
            comments :[],
            description : post.description
        }
        console.log("upload = "+upload)

        await db.collection('posts').doc(id).set(upload)
        await db.collection('users').doc(user.uid).update({
            posts: firebase.firestore.FieldValue.arrayUnion(id)
        })
     }catch(e){
         alert(e)
     }
 }
}