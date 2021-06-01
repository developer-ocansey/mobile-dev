import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { formatCurrency } from '../../utils/index';
import styles from './style';

const RelatedProduct = (subCategoryId) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    database()
      .ref(`/products/${subCategoryId.id}`)
      .once('value')
      .then((snapshot) => {
        setProducts(snapshot.val());
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  if (loading) {
    return (
      <ActivityIndicator setLoading={setLoading} color="#E52221" size="large" />
    );
  } else {
    return products.map((product, index) => {
      return (
        <View key={index} style={styles.productWrap}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetails', { product: product })
            }
          >
            <View style={styles.productImageWrap}>
              <Image
                style={styles.productImage}
                source={{ uri: product.image }}
              />
            </View>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productPrice}>
                {formatCurrency(product.price)}
              </Text>
              <Text style={styles.productUnit}> /{product.unit}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }
};
const ProductDetailsScreen = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const { product, subCategoryId } = route.params;
  const addToProducts = () => {
    const ref = database()
      .ref('/cart/' + auth().currentUser.uid)
      .push();
    ref
      .set({
        product: product,
        quantity: quantity,
      })
      .then(() => Alert.alert('Product added to cart'))
      .catch(function (error) {
        console.error(error);
      });
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ScrollView style={styles.body}>
        <View style={styles.productPicWrap}>
          <Image style={styles.productImage2} source={{ uri: product.image }} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName2}>{product.description}</Text>
          <View style={styles.prodSec}>
            <View style={styles.productDetails2}>
              <Text style={styles.productPrice2}>
                {formatCurrency(product.price)}
              </Text>
              <Text style={styles.productUnit2}> / {product.unit}</Text>
            </View>
            <View style={styles.action}>
              <TouchableOpacity>
                <Feather
                  style={styles.menuIcon}
                  name="plus"
                  color="#FFFFFF"
                  size={25}
                  onPress={() => setQuantity(quantity + 1)}
                />
              </TouchableOpacity>
              <Text style={styles.menuIcon}>{quantity}</Text>
              <TouchableOpacity>
                <Feather
                  style={styles.menuIcon}
                  name="minus"
                  color="#FFFFFF"
                  size={25}
                  onPress={() => setQuantity(quantity < 2 ? 1 : quantity - 1)}
                />
              </TouchableOpacity>
            </View>
          </View>
          {user ? (
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => addToProducts()}
            >
              <Text
                style={[
                  styles.cartText,
                  {
                    color: '#FFFFFF',
                  },
                ]}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => navigation.navigate('Login')}
            >
              <Text
                style={[
                  styles.cartText,
                  {
                    color: '#FFFFFF',
                  },
                ]}
              >
                Login to add items to cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.relProducts}>
          <Text style={styles.relProductsText}>Related Products</Text>
          <View style={styles.productContainer}>
            <RelatedProduct id={subCategoryId} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
ProductDetailsScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetailsScreen;
