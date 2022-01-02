import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

initializeApp({
  apiKey: 'AIzaSyDLpb9_cPW9sen4juWVq8zp7rU-De5QeyY',
  authDomain: 'svatba-ac848.firebaseapp.com',
  projectId: 'svatba-ac848',
  storageBucket: 'svatba-ac848.appspot.com',
  messagingSenderId: '925148974173',
  appId: '1:925148974173:web:33a0cb1832ec1c3fe051b4',
});

const firestore = getFirestore();
export { firestore };
