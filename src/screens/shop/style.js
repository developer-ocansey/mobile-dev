import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('screen');
const heightLogo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E52221',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: '500',
    paddingTop: 15,
  },
  header: {
    flex: 0.65,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  footer: {
    flex: 3,
    backgroundColor: '#F9F9F9',
  },
  logo: {
    width: heightLogo,
    height: heightLogo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tabmenu: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  menuitem: {
    fontSize: 18,
    color: '#777777',
    marginRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  menuitemactive: {
    fontSize: 18,
    color: '#E52221',
    marginRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 4,
    borderBottomEndRadius: 5,
    borderBottomColor: '#E52221',
  },
  productContainer: {
    padding: 20,
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
});

export default styles;
