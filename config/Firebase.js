import * as firebase from 'firebase'
import "firebase/auth";
require('firebase/firestore')

  const firebaseConfig = {
    apiKey: "AIzaSyDIubgU0NaV7zPDq_yQ_ScRREDE-7viGpc",
    authDomain: "instaclone-2011c.firebaseapp.com",
    projectId: "instaclone-2011c",
    storageBucket: "instaclone-2011c.appspot.com",
    messagingSenderId: "1015239164178",
    appId: "1:1015239164178:web:81453c2fb4d133723cf3cb",
    measurementId: "G-0MJ7G4YTM7"
  };
  //if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// //  }
// // else {
// //     firebase.app(); // if already initialized, use that one
// //  }

//   const db = firebase.firestore()

// export default db;


firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db;