import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import styles from './style';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
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

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
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

  const login = () => {
    if (data.username == '' || data.password == '') {
      Alert.alert('Email or passwod not set');
      return;
    }
    setData({
      ...data,
      loading: true,
    });
    auth()
      .signInWithEmailAndPassword(data.username, data.password)
      .then(() => {
        setData({
          ...data,
          loading: false,
        });
        navigation.goBack();
      })
      .catch((error) => {
        setData({
          ...data,
          loading: false,
        });
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Unable to login',
            'This user does not exist kindly create an account!'
          );
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert(
            'Unable to login',
            'The password you entered is incorrect!'
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
        <Text style={styles.text}>Login to continue to your account</Text>
      </View>
      <ScrollView style={styles.footer}>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
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
            <Animatable.View animation="fadeInLeft" duration={500} />
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
            <Animatable.View animation="fadeInLeft" duration={500} />
          )}

          <TouchableOpacity>
            <Text style={{ color: '#E52221', marginTop: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={() => login()}>
              {data.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#FFFFFF',
                    },
                  ]}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LoginScreen;
