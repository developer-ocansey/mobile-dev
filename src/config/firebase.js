import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';

const androidCredentials = {
  clientId: '',
  apiKey: 'AIzaSyCWsboCrNxb5pJrLCzl554ulKaZ6H3BUCs',
  authDomain: 'wesemarket-cdddb.firebaseapp.com',
  databaseURL: 'https://wesemarket-cdddb.firebaseio.com',
  projectId: 'wesemarket-cdddb',
  storageBucket: 'gs://wesemarket-cdddb.appspot.com',
  messagingSenderId: '1040295600412',
  appId: 'com.weseMarket',
};

const iosCredentials = {
  clientId: '',
  apiKey: 'AIzaSyCWsboCrNxb5pJrLCzl554ulKaZ6H3BUCs',
  authDomain: 'wesemarket-cdddb.firebaseapp.com',
  databaseURL: 'https://wesemarket-cdddb.firebaseio.com',
  projectId: 'wesemarket-cdddb',
  storageBucket: 'gs://wesemarket-cdddb.appspot.com',
  messagingSenderId: '1040295600412',
  appId: 'com.weseMarket',
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});
const config = {
  name: 'weseMarket',
};

firebase.initializeApp(credentials, config);
