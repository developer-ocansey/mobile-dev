import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
};
SettingsScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SettingsScreen;
