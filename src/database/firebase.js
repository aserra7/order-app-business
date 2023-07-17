import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCfP5rzVdrBgk9m2ZWopvbY4PtWVh6fJC4",
    authDomain: "order-app-2b528.firebaseapp.com",
    projectId: "order-app-2b528",
    storageBucket: "order-app-2b528.appspot.com",
    messagingSenderId: "923232478716",
    appId: "1:923232478716:web:24399d3a0ea2aa13773e79",
    measurementId: "G-EGHNDX9LLV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;