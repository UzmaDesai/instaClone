import * as firebase from 'firebase'
import db from '../config/Firebase'
import { orderBy } from 'react-lodash'

export const updateEmail = (input) => {
	return {type:'UPDATE_EMAIL', payload: input}
}
export const updatePassword = (input) => {
	return {type:'UPDATE_PASSWORD', payload: input}
}

export const updateUsername = (input) => {
	return {type:'UPDATE_USERNAME', payload: input}
}

export const updatePhoto = (input) => {
	return {type:'UPDATE_PHOTO', payload: input}
}


export const signup = () => {
    return async(dispatch,getState) => {
            try{
                const { username,email, password } = getState().user
                
                const response = await firebase.auth().createUserWithEmailAndPassword(email,password)

                if(response.user.uid) {
                    const user = {
                        uid:response.user.uid,
                        username:username,
                        email:email,
                        posts:[],
                        bio:'',
                        likes:0,
                        photo:''
                    }
                    await db.collection('users').doc(response.user.uid).set(user)
                    dispatch({type:'LOGIN',payload:user})
                    alert('User has been signed in.')
                }
            }catch(e){
                alert(e)
            }
        }
}

export const login = () => {
    return async(dispatch,getState) => {
        try{
            const { email,password } = getState().user
            
            const response  = await firebase.auth().signInWithEmailAndPassword(email,password)

            dispatch(getUser(response.user.uid)) //retrieves the unique id of the user
        }catch(e){
            alert(e)
        }
    }
}

//therefore in the func below we need to get the statistics n data from user with given unique id
export const getUser = (uid) => {
    return async(dispatch) => {
        try {
            const userQuery = await db.collection('users').doc(uid).get()
            let user = userQuery.data()
    
            //Create an empty array to store all the post of the respective user.
            let posts = []
            const postQuery = await db.collection('posts').where('uid', '==', uid).get()
             postQuery.forEach(function(response) {
                 posts.push(response.data())
             });
    
             //Arrange the posts in the descending order i.e latest first
             user.posts = orderBy(posts,'data','desc')
    
             dispatch({type:'LOGIN',payload:user})
        }catch(e){
            alert(e)
        }
        
    }

}
