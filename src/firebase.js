import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwxlgjK7_sDgYabH503oSH2fZw-CT36hg",
    authDomain: "encore-39fa4.firebaseapp.com",
    databaseURL: "https://encore-39fa4.firebaseio.com",
    projectId: "encore-39fa4",
    storageBucket: "encore-39fa4.appspot.com",
    messagingSenderId: "1028944592447",
    appId: "1:1028944592447:web:5420a8b0ea4730f7cfc28a",
    measurementId: "G-WQ6ZW04WS5"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const chrisvenuesCollection = db.collection('chrisvenues')
const sliderCollection = db.collection('slider')
const categoryCollection = db.collection('category')

export {
  db,
  auth,
  usersCollection,
  chrisvenuesCollection,
  sliderCollection,
  categoryCollection
}