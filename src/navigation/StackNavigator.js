import React, { useEffect, useState } from 'react';

import AccountScreen from '../screens/account/account';
import CartScreen from '../screens/cart/cart';
import ContactScreen from '../screens/contact/contact';
import FaqScreen from '../screens/faq/faq';
import Feather from 'react-native-vector-icons/Feather';
import LoginScreen from '../screens/login/login';
import MarketplaceScreen from '../screens/marketplace/marketplace';
import Onboard from '../screens/onboard/onboard';
import OrderDetailsScreen from '../screens/orderdetails/orderdetails';
import OrdersScreen from '../screens/orders/orders';
import Pay from '../screens/pay/pay';
import ProductDetailsScreen from '../screens/productdetails/productdetails';
import ResetPasswordScreen from '../screens/resetpassword/resetpassword';
import SearchScreen from '../screens/search/search';
import ShopScreen from '../screens/shop/shop';
import SignupScreen from '../screens/signup/signup';
import { StyleSheet } from 'react-native';
import TermsScreen from '../screens/terms/terms';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import editUserScreen from '../screens/editUser/edituser';

const OrderStack = createStackNavigator();

const OrderStackScreen = ({ navigation }) => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          title: 'My Orders',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <OrderStack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          title: 'Order Details',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </OrderStack.Navigator>
  );
};

const ShopStack = createStackNavigator();

const ShopStackScreen = ({ navigation }) => {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          headerTitle: 'Marketplace',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Feather
              style={styles.searchIcon}
              name="search"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.navigate('SearchScreen')}
            />
          ),
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <ShopStack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          title: 'Shop',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ShopStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        title: 'Product Search',
        headerStyle: {
          backgroundColor: '#E52221',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
      <ShopStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ShopStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <AccountStack.Screen name="Login" component={LoginScreen} />
    </ShopStack.Navigator>
  );
};

const AccountStack = createStackNavigator();

const AccountStackScreen = ({ navigation }) => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: 'My Account',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="editUserScreen"
        component={editUserScreen}
        options={{
          title: 'Edit Details',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <AccountStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          title: 'Reset Password',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <AccountStack.Screen name="Login" component={LoginScreen} />
      <AccountStack.Screen name="Signup" component={SignupScreen} />
    </AccountStack.Navigator>
  );
};

const CartStack = createStackNavigator();

const CartStackScreen = ({ navigation }) => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <CartStack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          title: 'My Orders',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <ShopStack.Screen
        name="Pay"
        component={Pay}
        options={{
          title: 'Payments',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <AccountStack.Screen
        name="editUserScreen"
        component={editUserScreen}
        options={{
          title: 'Edit Details',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </CartStack.Navigator>
  );
};

const FaqStack = createStackNavigator();

const FaqStackScreen = ({ navigation }) => {
  return (
    <FaqStack.Navigator>
      <FaqStack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{
          title: 'Frequently Asked Question',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </FaqStack.Navigator>
  );
};

const TermsStack = createStackNavigator();

const TermsStackScreen = ({ navigation }) => {
  return (
    <TermsStack.Navigator>
      <TermsStack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{
          title: 'Terms and Conditions',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </TermsStack.Navigator>
  );
};

const ContactStack = createStackNavigator();

const ContactStackScreen = ({ navigation }) => {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: 'Contact Us',
          headerStyle: {
            backgroundColor: '#E52221',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Feather
              style={styles.menuIcon}
              name="menu"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </ContactStack.Navigator>
  );
};

const OnboardStack = createStackNavigator();

const OnboardStackScreen = ({ navigation }) => {
  return (
    <OnboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardStack.Screen name="Onboard" component={Onboard} />
    </OnboardStack.Navigator>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
});

export {
  OrderStackScreen,
  ShopStackScreen,
  AccountStackScreen,
  CartStackScreen,
  FaqStackScreen,
  TermsStackScreen,
  ContactStackScreen,
  OnboardStackScreen,
};
