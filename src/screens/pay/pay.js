import React, { useState, useEffect } from 'react';
import PaystackWebView from 'react-native-paystack-webview';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { TOTAL } from '../cart/cart';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

const processOrder = (cartItems, navigation, data) => {
  let clearCart = new Promise((resolve, reject) => {
    resolve(
      database()
        .ref(
          `/orders/${auth().currentUser.uid}/${new Date().getUTCMilliseconds()}`
        )
        .set({
          order: cartItems,
          date: `${new Date()}`,
          customer_information: data,
          status: 'pending',
          total: TOTAL,
        })
        .then(() => {
          console.log('remove cart');
        })
        .catch(function (error) {
          console.error(error);
        })
    );
  });
  clearCart.then(() => {
    database()
      .ref(`/cart/${auth().currentUser.uid}`)
      .remove()
      .then(() => {
        navigation.navigate('OrdersScreen'); //redirect to success page
      })
      .catch(function (error) {
        console.error(error);
      });
  });
};

const Pay = ({ route }) => {
  const navigation = useNavigation();
  const { cartItems } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    location: '',
    houseNumber: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    specifics: '',
  });

  const getCustomerInformation = () => {
    database()
      .ref(`/delivery_information/${auth().currentUser.uid}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          setLoading(false);
          setData(snapshot.val());
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //Refactor...
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getCustomerInformation();
    } else {
      <LoginScreen navigation={navigation} />;
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []); //extract this a function and use global

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ScrollView>
        <View>
          <Text style={styles.accountText}>DELIVERY ADDRESS</Text>
          <View style={styles.delDetails}>
            <View style={styles.left}>
              <Feather name="map-pin" color="#282828" size={23} />
              <Text style={styles.delDetailsText}>
                {data.houseNumber}, {data.location}
              </Text>
            </View>
            {loading && <ActivityIndicator color="#E52221" />}
          </View>
        </View>
        <View>
          <Text style={styles.accountText}>FULL NAME</Text>
          <View style={styles.delDetails}>
            <View style={styles.left}>
              <Feather name="user" color="#282828" size={23} />
              <Text style={styles.delDetailsText}>{data.fullName}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.accountText}>PHONE NUMBER</Text>
          <View style={styles.delDetails}>
            <View style={styles.left}>
              <Feather name="phone" color="#282828" size={23} />
              <Text style={styles.delDetailsText}>{data.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.accountText}>EMAIL ADDRESS</Text>
          <View style={styles.delDetails}>
            <View style={styles.left}>
              <Feather name="mail" color="#282828" size={23} />
              <Text style={styles.delDetailsText}>{data.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {data.email == '' ||
      data.phoneNumber == '' ||
      data.location == '' ||
      data.houseNumber == '' ? (
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => navigation.navigate('editUserScreen')}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={[
                styles.btnText,
                {
                  color: '#FFFFFF',
                },
              ]}
            >
              Please set you delivery details
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <PaystackWebView
          buttonText={
            <View style={styles.userBtn}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: '#FFFFFF',
                  },
                ]}
              >
                Pay Now
              </Text>
            </View>
          }
          showPayButton={true}
          paystackKey="pk_test_d35f71a85d2e9872c32eb172559ccf8580d994eb"
          amount={TOTAL}
          billingEmail={auth().currentUser.email}
          billingMobile="09787377462"
          billingName="Emmanuel Antonio"
          refNumber={new Date().getUTCMilliseconds()}
          ActivityIndicatorColor="green"
          SafeAreaViewContainer={{ marginTop: 5 }}
          SafeAreaViewContainerModal={{ marginTop: 5 }}
          onCancel={(e) => {
            Alert.alert('Payment failed', 'Try again');
            navigation.navigate('CartScreen');
          }}
          onSuccess={(res) => {
            processOrder(cartItems, navigation, data);
          }}
          autoStart={false}
        />
      )}
    </View>
  );
};

Pay.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Pay;

// Extract all configurations to json file
