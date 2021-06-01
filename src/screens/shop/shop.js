import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { formatCurrency } from '../../utils/index';
import PropTypes from 'prop-types';

import styles from './style';

const ShopScreen = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const [SUBCATEGORY_ID, SET_SUBCATEGORY_ID] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    database()
      .ref(`/sub_categories/${category.id}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          setSubCategories(snapshot.val());
          load(snapshot.val()[0].subCategoryId);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const load = (id) => {
    setLoading(true);
    database()
      .ref(`/products/${id}`)
      .once('value')
      .then((snapshot) => {
        SET_SUBCATEGORY_ID(id);
        if (snapshot.val()) {
          setProducts(snapshot.val());
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };
  const LoadSubCategories = () => {
    return subCategories.map((subCategory, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => load(subCategory.subCategoryId)}
        >
          <Text
            style={
              subCategory.subCategoryId === SUBCATEGORY_ID
                ? styles.menuitemactive
                : styles.menuitem
            }
          >
            {subCategory.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  const LoadProducts = () => {
    if (loading) {
      return (
        <ActivityIndicator
          setLoading={setLoading}
          color="#E52221"
          size="large"
        />
      );
    } else {
      if (products.length > 0) {
        return products.map((product, index) => {
          return (
            <View key={index} style={styles.productWrap}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    product: product,
                    subCategoryId: SUBCATEGORY_ID,
                  })
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
                  <Text style={styles.productUnit}> / {product.unit}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        });
      } else {
        return (
          <View>
            <Text>
              Please check back later, No products available for this sub
              category
            </Text>
          </View>
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          resizeMode="cover"
          style={styles.bgImage}
          source={{ uri: category.image }} // Dyanamic loading
        >
          <View style={styles.overlay} />
          <Text style={styles.logoText}>{category.name}</Text>
        </ImageBackground>
        <View>
          <ScrollView horizontal style={styles.tabmenu}>
            <LoadSubCategories />
          </ScrollView>
        </View>
      </View>
      <ScrollView style={styles.footer}>
        <View style={styles.productContainer}>
          <LoadProducts />
        </View>
      </ScrollView>
    </View>
  );
};
ShopScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ShopScreen;
