import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

firebase.initializeApp({ 
    apiKey: 'AIzaSyACTYAU0ubaDcEOvmXtuLICgsyaNcaCKX4',
    authDomain: "diary-app-690a6.firebaseapp.com",
    projectId: "diary-app-690a6",
    storageBucket: "diary-app-690a6.appspot.com",
    messagingSenderId: "356647075508",
    appId: "1:356647075508:web:22ea8ed28766f2deae21e1"
 });

export default firebase.database();
export const auth = firebase.auth();