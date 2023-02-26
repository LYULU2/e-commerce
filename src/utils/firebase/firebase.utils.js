import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
 } from 'firebase/auth';
 import{
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCcd-UBXBDrRhclcX3epaXyz2uewQXYqrA",
    authDomain: "clothing-db-77614.firebaseapp.com",
    projectId: "clothing-db-77614",
    storageBucket: "clothing-db-77614.appspot.com",
    messagingSenderId: "28223243703",
    appId: "1:28223243703:web:0be36c412c63f97c03d432"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig); 

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters(
    {
        prompt:"select_account",
    }
  );

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const{ displayName, email } =userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  };