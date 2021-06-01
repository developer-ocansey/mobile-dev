import { View, StatusBar, Button } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

const ContactScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Button
        title="Go to Shop"
        onPress={() => navigation.navigate('ShopScreen')}
      />
    </View>
  );
};

ContactScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ContactScreen;
