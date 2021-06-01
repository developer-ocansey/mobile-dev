import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { formatCurrency } from '../../utils/index';

export const DELIVERY_FEE = 1000;
export let TOTAL = 0;
let CUSTOMER_INFORMATION = {};

const CartTotal = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (auth().currentUser) {
      database()
        .ref('/cart/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            setCart(snapshot.val());
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
  return formatCurrency(
    Object.keys(cart).reduce(
      (sum, key) =>
        sum + parseFloat(cart[key].product.price * cart[key].quantity || 0),
      0
    )
  );
};

const Total = () => {
  const [cart, setCart] = useState([]);
  if (auth().currentUser) {
    database()
      .ref('/cart/' + auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          setCart(snapshot.val());
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  TOTAL = Object.keys(cart).reduce(
    (sum, key) =>
      sum + parseFloat(cart[key].product.price * cart[key].quantity || 0),
    DELIVERY_FEE
  );
  return formatCurrency(TOTAL);
};

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState({
    location: '',
    houseNumber: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    specifics: '',
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const isVisible = useIsFocused();
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
      database()
        .ref(`/delivery_information/${auth().currentUser.uid}`)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            setData(snapshot.val());
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      getCart();
    }
    if (isVisible) {
      getCart();
    }
  }, [isVisible, user]);

  const clearCart = () => {
    Alert.alert(
      'Clear cart',
      'Are you sure you want to clear cart',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            database()
              .ref(`/cart/${auth().currentUser.uid}`)
              .remove()
              .then(() => {
                Alert.alert('Product removed from cart');
                getCart();
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const removeCart = (key) => {
    Alert.alert(
      'Remove item from cart',
      'Are you sure you want to remove this item cart',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            database()
              .ref(`/cart/${auth().currentUser.uid}/${key}`)
              .remove()
              .then(() => {
                Alert.alert('Product removed from cart');
                getCart();
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const CartItem = () => {
    return Object.keys(cartItems).map((key, index) => {
      return (
        <View style={styles.cartItems} key={index}>
          <View style={styles.productImageWrap}>
            <Image
              style={styles.productImage}
              source={{ uri: cartItems[key].product.image }}
            />
          </View>
          <View>
            <Text style={styles.productName}>
              {cartItems[key].product.name}
            </Text>
            <View style={styles.productDetails}>
              <Text style={styles.productPrice}>
                {formatCurrency(cartItems[key].product.price)}
              </Text>
              <Text style={styles.productUnit}>
                {' '}
                /{cartItems[key].product.unit}
              </Text>
            </View>
            <View style={styles.action}>
              <Text style={styles.productQty}>Quantity:</Text>
              <Text>{cartItems[key].quantity}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              removeCart(key);
            }}
          >
            <Feather name="x-circle" color="#282828" size={20} />
          </TouchableOpacity>
        </View>
      );
    });
  };
  return (
    <>
      {user ? (
        <>
          {Object.keys(cartItems).length > 0 ? (
            <View style={styles.container}>
              <StatusBar backgroundColor="#009387" barStyle="light-content" />
              <View style={styles.body}>
                <View style={styles.bodyHead}>
                  <View>
                    <Text style={styles.bodyHeadText}>
                      Cart items ({Object.keys(cartItems).length})
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => clearCart()}>
                      <Text style={styles.bodyHeadText}>Clear Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <ScrollView style={styles.cartItemsWrap}>
                  {CartItem()}
                </ScrollView>
              </View>
              <View style={styles.footer}>
                <View style={styles.cartAction}>
                  <View style={styles.cartSum}>
                    <Text style={styles.cartActionText}>Cart total</Text>
                    <Text style={styles.cartActionText}>
                      <CartTotal />
                    </Text>
                  </View>
                  <View style={styles.cartSum}>
                    <Text style={styles.cartActionText}>Shipping</Text>
                    <Text style={styles.cartActionText}>
                      {formatCurrency(DELIVERY_FEE)}
                    </Text>
                  </View>
                  <View style={styles.cartSumTotal}>
                    <Text style={styles.cartActionText}>Total</Text>
                    <Text style={styles.cartActionText}>
                      <Total />
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.checkoutBtn}
                      onPress={() =>
                        navigation.navigate('Pay', {
                          cartItems: cartItems,
                          customerInfo: data,
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.checkoutText,
                          {
                            color: '#FFFFFF',
                          },
                        ]}
                      >
                        Checkout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}> Your cart is empty</Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>
            Please login to manage your cart
          </Text>
        </View>
      )}
    </>
  );
};

CartScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CartScreen;
