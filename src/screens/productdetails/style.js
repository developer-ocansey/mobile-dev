import { StyleSheet, Platform } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  productPicWrap: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    height: 300,
    alignItems: 'center',
    padding: 13,
  },
  productImage2: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  productName2: {
    fontSize: 20,
    color: '#282828',
  },
  productDetails2: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
  },
  productPrice2: {
    color: '#E52221',
    fontSize: 25,
    marginBottom: 10,
  },
  disproductPrice: {
    fontSize: 15,
    color: '#777777',
  },
  productUnit2: {
    fontSize: 25,
    color: '#777777',
  },
  action: {
    flexDirection: 'row',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    paddingBottom: 5,
    ...Platform.select({
      ios: {
        height: 35,
      },
      android: {},
      default: {},
    }),
    justifyContent: 'space-between',
    width: '28%',
  },
  productQty: {
    fontSize: 15,
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#282828',
    fontSize: 15,
    width: 100,
  },
  cartBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E52221',
    backgroundColor: '#E52221',
    marginTop: 20,
  },
  cartText: {
    fontSize: 20,
  },
  relProducts: {
    paddingVertical: 10,
  },
  relProductsText: {
    padding: 20,
    fontSize: 16,
  },
  productContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productWrap: {
    width: '45%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    height: 220,
    alignItems: 'center',
    padding: 13,
  },
  productImageWrap: {
    width: '95%',
    height: 110,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 110,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
  },
  productPrice: {
    color: '#E52221',
    fontSize: 15,
  },
  productUnit: {
    fontSize: 15,
    color: '#777777',
  },
  productDetails: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
    fontSize: 15,
  },
  menuIcon: {
    color: '#000000',
    fontSize: 17,
    padding: 7,
  },
  prodSec: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
