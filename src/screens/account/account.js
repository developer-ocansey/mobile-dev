import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import styles from './style';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import LoginScreen from '../login/login';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const isVisible = useIsFocused();
  const [data, setData] = useState({
    location: '',
    houseNumber: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    specifics: '',
  });

  const logOut = () => {
    Alert.alert(
      'Logout',
      'Do you want to proceed to log out from weseMarket',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (user) {
              auth()
                .signOut()
                .then(() => {
                  Alert.alert('You signed out!');
                })
                .catch(function (error) {
                  console.error(error);
                });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getCustomerInformation = () => {
    if (user) {
      setLoading(true);
      database()
        .ref(`/delivery_information/${auth().currentUser.uid}`)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            setData(snapshot.val());
          }
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      getCustomerInformation();
    }
    if (isVisible) {
      getCustomerInformation();
    }
  }, [isVisible, user]);

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <ScrollView>
            <View>
              <Text style={styles.accountText}>DELIVERY DETAILS</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('editUserScreen')}
              >
                <View style={styles.delDetails}>
                  <View style={styles.left}>
                    <Feather name="truck" color="#282828" size={23} />
                    <Text style={styles.delDetailsText}>
                      {data.location != '' ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                  {loading ? (
                    <ActivityIndicator color="#E52221" />
                  ) : (
                    <Feather name="chevron-right" color="#777777" size={20} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {data.fullName != '' && (
              <View>
                <Text style={styles.accountText}>FULL NAME</Text>
                <View style={styles.delDetails}>
                  <View style={styles.left}>
                    <Feather name="user" color="#282828" size={23} />
                    <Text style={styles.delDetailsText}>{data.fullName}</Text>
                  </View>
                </View>
              </View>
            )}
            {data.phoneNumber != '' && (
              <View>
                <Text style={styles.accountText}>PHONE NUMBER</Text>
                <View style={styles.delDetails}>
                  <View style={styles.left}>
                    <Feather name="phone" color="#282828" size={23} />
                    <Text style={styles.delDetailsText}>
                      {data.phoneNumber}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {data.email != '' && (
              <View>
                <Text style={styles.accountText}>EMAIL ADDRESS</Text>
                <View style={styles.delDetails}>
                  <View style={styles.left}>
                    <Feather name="mail" color="#282828" size={23} />
                    <Text style={styles.delDetailsText}>{data.email}</Text>
                  </View>
                </View>
              </View>
            )}
            <View>
              <Text style={styles.accountText}>SETTINGS</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPasswordScreen')}
              >
                <View style={styles.delDetails}>
                  <View style={styles.left}>
                    <Feather name="settings" color="#282828" size={23} />
                    <Text style={styles.delDetailsText}>Reset Password</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.accountText}>SETTINGS</Text>
              <TouchableOpacity onPress={() => logOut()}>
                <View style={styles.delDetails}>
                  <View style={styles.left}>
                    <Feather name="lock" color="#282828" size={23} />
                    <Text style={styles.delDetailsText}>Log out</Text>
                  </View>
                  <Feather name="chevron-right" color="#777777" size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <LoginScreen navigation={navigation} />
      )}
    </>
  );
};
AccountScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AccountScreen;
// TODO extract all in-line styles golbal style...
