import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import styles from './style';

const EditUserScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.editDetailsWrap}>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>CURRENT PASSWORD</Text>
          <View style={styles.action}>
            <Feather name="lock" size={20} />
            <TextInput
              placeholder="Enter current password"
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
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>NEW PASSWORD</Text>
          <View style={styles.action}>
            <Feather name="lock" size={20} />
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput, {}]}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.editDetails}>
          <Text style={[styles.text_footer, {}]}>CONFIRM NEW PASSWORD</Text>
          <View style={styles.action}>
            <Feather name="lock" size={20} />
            <TextInput
              placeholder="Confirm new password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput, {}]}
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => navigation.navigate('AccountScreen')}
        >
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
        </TouchableOpacity>
      </View>
    </View>
  );
};
EditUserScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditUserScreen;
