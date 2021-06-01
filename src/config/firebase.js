import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';

const androidCredentials = {
  clientId: '',
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const iosCredentials = {
  clientId: '',
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});
const config = {
  name: '',
};

firebase.initializeApp(credentials, config);
