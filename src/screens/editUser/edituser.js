import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import PropTypes from 'prop-types';
import styles from './style';
const editUserScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    location: '',
    houseNumber: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    specifics: '',
  });

  const getCustomerInformation = () => {
    database()
      .ref(`/delivery_information/${auth().currentUser.uid}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          setLoading(false);
          setData(snapshot.val());
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const setCustomerInformation = () => {
    setLoading(true);
    database()
      .ref(`/delivery_information/${auth().currentUser.uid}`)
      .set({
        location: data.location,
        houseNumber: data.houseNumber,
        phoneNumber: data.phoneNumber,
        email: data.email,
        fullName: data.fullName,
        specifics: data.specifics,
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
        Alert.alert('Delivery information updated');
      });
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getCustomerInformation();
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []); //extract this ti a function and use global

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ScrollView style={styles.editDetailsWrap}>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>LOCATION</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Location (e.g. lga, landmark street name)"
              placeholderTextColor="#282828"
              style={[styles.textInput, {}]}
              onChangeText={(val) => {
                setData({
                  ...data,
                  location: val,
                });
              }}
              autoCapitalize="none"
              value={data.location}
            />
          </View>
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>HOUSE NUMBER</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter house number"
              placeholderTextColor="#282828"
              style={[styles.textInput, {}]}
              onChangeText={(val) => {
                setData({
                  ...data,
                  houseNumber: val,
                });
              }}
              autoCapitalize="none"
              value={data.houseNumber}
            />
          </View>
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>PHONE NUMBER</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter phone number"
              placeholderTextColor="#282828"
              style={[styles.textInput, {}]}
              autoCapitalize="none"
              value={data.phoneNumber}
              onChangeText={(val) => {
                setData({
                  ...data,
                  phoneNumber: val,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>EMAIL ADDRESS</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter email address"
              placeholderTextColor="#282828"
              style={[styles.textInput, {}]}
              autoCapitalize="none"
              value={data.email}
              onChangeText={(val) => {
                setData({
                  ...data,
                  email: val,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>FULL NAME</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter full name"
              placeholderTextColor="#282828"
              style={[styles.textInput, {}]}
              autoCapitalize="none"
              value={data.fullName}
              onChangeText={(val) => {
                setData({
                  ...data,
                  fullName: val,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>SPECIFIC INSTRUCTION</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter any specific instructions (Optional)"
              placeholderTextColor="#282828"
              style={[styles.textInput, {}]}
              autoCapitalize="none"
              value={data.specifics}
              onChangeText={(val) => {
                setData({
                  ...data,
                  specifics: val,
                });
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => setCustomerInformation()}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={[
                styles.btnText,
                {
                  color: '#FFFFFF',
                },
              ]}
            >
              Save
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

editUserScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default editUserScreen;
