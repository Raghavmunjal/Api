import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const config = {
  apiKey: 'AIzaSyC8PN6FXZdPuvcUIioJHD8wZoRTEpV4-l8',
  authDomain: 'react-auth-b7eb1.firebaseapp.com',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const App = () => {
  const [signedIn, setSignedIn] = useState(false)
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setSignedIn(!!user)
      })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  return (
    <div>
      {signedIn ? (
        <div>
          <h1>Signed In</h1>
          <p> Welcome {firebase.auth().currentUser.displayName} </p>
          <img src={firebase.auth().currentUser.photoURL} alt='' />
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  )
}

export default App
