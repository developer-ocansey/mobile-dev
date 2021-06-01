import React, { useState, useEffect, View, Text } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  OrderStackScreen,
  ShopStackScreen,
  AccountStackScreen,
  CartStackScreen,
} from './StackNavigator';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const isVisible = useIsFocused();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []); //extract this ti a function and use global

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (user) {
      getCart();
    }
    if (isVisible) {
      getCart();
    }
  }, [isVisible, user]);

  const getCart = () => {
    if (user) {
      database()
        .ref('/cart/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            if (Object.keys(snapshot.val()).length > 0) {
              setCartItems(snapshot.val());
            }
          } else {
            setCartItems([]);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Shop"
      tabBarOptions={{
        activeTintColor: '#E52221',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Marketplace"
        component={ShopStackScreen}
        options={{
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="store" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackScreen}
        options={{
          tabBarLabel: 'My Orders',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="receipt" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          tabBarLabel: 'Cart',
          // tabBarBadge: Object.keys(cartItems).length,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="local-grocery-store" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarLabel: 'My Account',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
