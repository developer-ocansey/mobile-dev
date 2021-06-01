import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { Component } from 'react';
import DrawerNavigator from '../../navigation/DrawerNavigator';
import Onboarding from 'react-native-onboarding-swiper';

const Onboard = ({ navigation }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/onboarding1.png')}
              style={{ width: 300, height: 410, resizeMode: 'contain' }}
            />
          ),
          title: 'Convenience',
          subtitle:
            'Shop from your favorite Store from the comfort of your home.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/onboarding2.png')}
              style={{ width: 300, height: 410, resizeMode: 'contain' }}
            />
          ),
          title: 'Quick Deliveries',
          subtitle: 'Get items delivered in minutes to your door step.',
        },
      ]}
      onSkip={() => {
        navigation.navigate('Home');
      }}
      onDone={() => {
        navigation.navigate('Home');
      }}
    />
  );
};

export default Onboard;
