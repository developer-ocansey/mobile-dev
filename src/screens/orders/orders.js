import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { formatCurrency } from '../../utils/index';
import PropTypes from 'prop-types';
import styles from './style';

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    database()
      .ref('/orders/' + auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        if (Object.keys(snapshot.val()).length > 0) {
          setOrders(snapshot.val());
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return Object.keys(orders).map((key, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('OrderDetails', {
            orderItems: orders[key].order,
            orderKey: key,
            orderDate: orders[key].date,
            orderTotal: orders[key].total,
          })
        }
      >
        <View style={styles.orderItems}>
          <Text style={styles.orderNumber}>Order no: {key}</Text>
          <Text style={styles.orderDetails}>
            {moment(orders[key].date).format('llll')}
          </Text>
          <Text style={styles.orderDetails}>
            Total: {formatCurrency(orders[key].total)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
};

const OrdersScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState();
  const isVisible = useIsFocused();
  const getOrders = () => {
    if (user) {
      database()
        .ref('/orders/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            if (Object.keys(snapshot.val()).length > 0) {
              setOrders(snapshot.val());
            }
          }
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
  }, []); //extract this ti a function and use global

  useEffect(() => {
    if (user) {
      getOrders();
    }
    if (isVisible) {
      getOrders();
    }
  }, [isVisible, user]);

  return (
    <>
      {user ? (
        <>
          {Object.keys(orders).length > 0 ? (
            <View style={styles.container}>
              <StatusBar backgroundColor="#009387" barStyle="light-content" />
              <View style={styles.body}>
                <View>
                  <View style={styles.bodyHead}>
                    <View>
                      <Text style={styles.bodyHeadText}>Order History</Text>
                      <Text style={styles.bodyHeadTextSmall}>
                        Click on an Order to view details
                      </Text>
                    </View>
                  </View>
                </View>
                <ScrollView style={styles.orderItemsWrap}>
                  <Orders navigation={navigation} />
                </ScrollView>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>
                {' '}
                Your don't have any orders yet
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>
            {' '}
            Please login to manage your orders
          </Text>
        </View>
      )}
    </>
  );
};
OrdersScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OrdersScreen;
