import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { sendGridEmail } from 'react-native-sendgrid';
import { sendGridConfig } from '../../config/sendgrid';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';
import styles from './style';
import { verifyTmpl } from '../../template/verify';

const verificationCode = Math.floor(1000 + Math.random() * 9000);

const Singup = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    stage: 0,
    code: '',
    loading: false,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
      });
    } else {
      setData({
        ...data,
        password: val,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: val,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const sendVerification = () => {
    if (data.username == '' || data.password == '') {
      Alert.alert('Email or passwod not set');
      return;
    }
    setData({
      ...data,
      loading: true,
    });
    const sendRequest = sendGridEmail(
      sendGridConfig.SENDGRID_API_KEY,
      data.username,
      sendGridConfig.FROM_EMAIL,
      'Email Verification',
      verifyTmpl(data, verificationCode),
      'text/html'
    );
    sendRequest
      .then((response) => {
        console.log(response);
        Alert.alert('A  verification mail has been sent to your email');
        setData({
          ...data,
          stage: 1,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = () => {
    setData({
      ...data,
      loading: true,
    });
    if (verificationCode == data.code) {
      Alert.alert('Email verified');
      auth()
        .createUserWithEmailAndPassword(data.username, data.password)
        .then(() => {
          Alert.alert('Account created', 'User account created');
          navigation.navigate('Login');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          console.error(error);
        });
    } else {
      Alert.alert('Invalid verification code entered');
    }
    setData({
      ...data,
      stage: 1,
      loading: false,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register now!</Text>
        <Text style={styles.text}>Create your account to get started</Text>
      </View>
      <ScrollView style={styles.footer}>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          {data.stage === 0 ? (
            <>
              <Text style={[styles.text_footer, {}]}>Email</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" size={20} />
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {}]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUser ? null : (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                ></Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" size={20} />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={[styles.textInput, {}]}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                ></Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" size={20} />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.confirm_secureTextEntry ? true : false}
                  style={[styles.textInput, {}]}
                  autoCapitalize="none"
                  onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                  {data.confirm_secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                ></Animatable.View>
              )}
            </>
          ) : (
            <>
              <Text style={[styles.text_footer, {}]}>Verification code</Text>
              <View style={styles.action}>
                <FontAwesome name="lock" size={20} />
                <TextInput
                  placeholder="Enter verification code"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {}]}
                  autoCapitalize="none"
                  value={data.code}
                  onChangeText={(val) => {
                    setData({
                      ...data,
                      code: val,
                    });
                  }}
                />
              </View>
            </>
          )}
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                data.stage === 0 ? sendVerification() : register();
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#FFFFFF',
                  },
                ]}
              >
                {data.loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>{data.stage === 0 ? 'Next' : 'Complete'}</>
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#E52221',
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#E52221',
                  },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

Singup.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Singup;
