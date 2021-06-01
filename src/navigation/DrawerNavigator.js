import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, View, Text } from 'react-native';
import {
  AccountStackScreen,
  FaqStackScreen,
  TermsStackScreen,
  ContactStackScreen,
  OnboardStackScreen,
} from './StackNavigator';
import BottomTabNavigator from './TabNavigator';
import DrawerContent from '../partials/DrawerContent/DrawerContent';
const STORAGE_KEY = '@wesemarket_';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const fl = await AsyncStorage.getItem(STORAGE_KEY);
      if (fl === null) {
        saveData();
      } else {
        setFirstLoad(false);
        setLoading(false);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage' + e);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'false');
      setLoading(false);
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };
  
  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator setLoading={true} color="#E52221" size="large" />
          <Text>Loading</Text>
        </View>
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          {firstLoad && (
            <Drawer.Screen
              name="Onboard"
              component={OnboardStackScreen}
              options={({ route, navigation }) => {
                return {
                  swipeEnabled: false,
                };
              }}
            />
          )}
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
          <Drawer.Screen name="Account" component={AccountStackScreen} />
          <Drawer.Screen name="FAQ" component={FaqStackScreen} />
          <Drawer.Screen name="Terms" component={TermsStackScreen} />
          <Drawer.Screen name="Contact" component={ContactStackScreen} />
        </Drawer.Navigator>
      )}
    </>
  );
};

export default DrawerNavigator;

// Refactor move this logic to index
