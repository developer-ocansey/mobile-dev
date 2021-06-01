/* eslint-disable prettier/prettier */
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import database from '@react-native-firebase/database';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const DisplayCategory = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    database()
      .ref('/categories')
      .once('value')
      .then((snapshot) => {
        setCategories(snapshot.val());
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return categories.map((category, index) => {
    return (
      <React.Fragment key={index}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          >
            <ActivityIndicator setLoading={true} color="#E52221" size="large" />
          </View>
        ) : (
          <TouchableHighlight
            style={{
              width: category.width,
              height: 150,
              backgroundColor: 'red',
              margin: 2.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.navigate('ShopScreen', { category: category })
            }
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.bgImage}
              source={{ uri: category.image }}
            >
              <View style={styles.overlay} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </ImageBackground>
          </TouchableHighlight>
        )}
      </React.Fragment>
    );
  });
};

const MarketplaceScreen = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 2.5,
        }}
      >
        <DisplayCategory />
      </View>
    </ScrollView>
  );
};

export default MarketplaceScreen;
