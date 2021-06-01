import { View, Linking } from 'react-native';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
// import { user } from '../../utils/index';

import styles from './style';

const logOut = () => {
  auth()
    .signOut()
    .then(() => {
      Alert.alert('User signed out!');
      auth().currentUser.reload();
    });
};

const DrawerContent = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []); //extract this to a function and use global

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {user && (
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={require('../../assets/avatar.jpg')}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                  <Title style={styles.title}>{user.name}</Title>
                  <Caption style={styles.caption}>
                    {user.email.length > 20
                      ? user.email.slice(0, 20) + '...'
                      : user.email}
                  </Caption>
                </View>
              </View>
            </View>
          )}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color }) => (
                <Feather name="home" color={color} size={23} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              )}
              label="My Account"
              onPress={() => {
                props.navigation.navigate('Account');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="help-circle" color={color} size={size} />
              )}
              label="FAQ"
              onPress={() => {
                Linking.openURL('https://wesemarket.com/');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="file" color={color} size={size} />
              )}
              label="Terms & Conditions"
              onPress={() => {
                Linking.openURL('https://wesemarket.com/');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="mail" color={color} size={size} />
              )}
              label="Contact Us"
              onPress={() => {
                Linking.openURL('https://wesemarket.com/');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {user ? (
          <Drawer.Item
            icon={({ color, size }) => (
              <Feather name="log-out" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => logOut()}
          />
        ) : (
          <Drawer.Item
            icon={({ color, size }) => (
              <Feather name="log-in" color={color} size={size} />
            )}
            label="Sign In"
            onPress={() => props.navigation.navigate('Login')}
          />
        )}
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
