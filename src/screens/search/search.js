import React, { useEffect, useState } from 'react';
import { StatusBar, Text, TextInput, View } from 'react-native';

import { Button } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
    getRes();
  }, [search]);


  const getRes = () => {
    database()
      .ref(`/products/`)
    .once('value')
      .then((snapshot) => {
      if (snapshot.val()) {
        setSearchRes(snapshot.val());
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const Result = () => {
    return Object.keys(searchRes).map((subCategory) => {
      return searchRes[subCategory].filter((data)=>data.name.includes(search)).map((product, index) => {
        return (
          <TouchableOpacity
            style={styles.search_}
            key={index}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                product: product,
                subCategoryId: subCategory,
              })
            }
          >
            <Text>{product.name}</Text>
          </TouchableOpacity>
        )
      })
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.searchHeader}>
      <TextInput
        placeholder="Enter product name"
        placeholderTextColor="#666666"
        style={[styles.textInput, {}]}
        autoCapitalize="none"
        onChangeText={(val) => setSearch(val)}
      />
        <Button style={styles.searchBtn} onPress={()=>getRes()}>
          <Feather name="search" color="#FFF" size={20} />
        </Button>
      </View>

      <View style={styles.searcResult}>
        <Result />        
      </View>
    </View>
  );
};

SearchScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SearchScreen;
