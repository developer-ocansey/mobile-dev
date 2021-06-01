import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 3,
    backgroundColor: '#F9F9F9',
  },
  BodyText: {
    color: '#000000',
    fontSize: 15,
  },
  orderItemsWrap: {
    padding: 20,
    marginBottom: 20,
  },
  orderItems: {
    height: 120,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  productImageWrap: {
    width: 110,
    height: 110,
    backgroundColor: '#ffffff',
    marginRight: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 110,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 10,
    fontSize: 15,
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
    marginTop: 5,
    fontSize: 15,
  },
  productQty: {
    fontSize: 15,
    marginTop: 10,
  },
  bodyHead: {
    paddingHorizontal: 35,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  bodyHeadText: {
    fontSize: 16,
  },
  bodyHeadTextSmall: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },
});

export default styles;
