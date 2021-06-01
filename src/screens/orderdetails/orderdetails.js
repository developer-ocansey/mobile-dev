import { Text, View, StatusBar, Image } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatCurrency } from '../../utils/index';
import styles from './style';

const OrderItems = ({ orderItems }) => {
  return Object.keys(orderItems).map((key, index) => {
    return (
      <View style={styles.orderItems} key={index}>
        <View style={styles.productImageWrap}>
          <Image
            style={styles.productImage}
            source={{ uri: orderItems[key].product.image }}
          />
        </View>
        <View>
          <Text style={styles.productName}>{orderItems[key].product.name}</Text>
          <View style={styles.productDetails}>
            <Text style={styles.productPrice}>
              ₦{formatCurrency(orderItems[key].product.price)}
            </Text>
            <Text style={styles.productUnit}> |Kg</Text>
          </View>
          <Text style={styles.productQty}>
            Quantity: {orderItems[key].quantity}
          </Text>
        </View>
      </View>
    );
  });
};

const OrderDetailsScreen = ({ route }) => {
  const { orderKey, orderTotal, orderDate, orderItems } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.body}>
        <View>
          <View style={styles.bodyHead}>
            <View>
              <Text style={styles.bodyHeadText}>Order no: {orderKey}</Text>
              <Text style={styles.bodyHeadTextSmall}>
                {moment(orderDate).format('llll')}
              </Text>
              <Text style={styles.bodyHeadTextSmall}>
                {Object.keys(orderItems).length} items
              </Text>
              <Text style={styles.bodyHeadTextSmall}>
                Total: ₦{formatCurrency(orderTotal)}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.orderItemsWrap}>
          <OrderItems orderItems={orderItems} />
        </ScrollView>
      </View>
    </View>
  );
};

OrderDetailsScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OrderDetailsScreen;
