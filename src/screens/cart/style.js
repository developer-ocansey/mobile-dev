import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 3,
    backgroundColor: '#F9F9F9',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#dddddd',
  },
  BodyText: {
    color: '#000000',
    fontSize: 15,
  },
  FooterText: {
    color: '#000000',
    fontSize: 15,
  },
  bodyHead: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  bodyHeadText: {
    fontSize: 16,
  },
  cartAction: {
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        paddingVertical: 25,
      },
      android: {
        paddingVertical: 5,
      },
      default: {},
    }),
    height: 120,
  },
  cartSum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartSumTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#dddddd',
    marginTop: 2.5,
    paddingTop: 2.5,
    ...Platform.select({
      ios: {
        marginTop: 5,
        paddingTop: 5,
      },
      android: {},
      default: {},
    }),
  },
  cartActionText: {
    color: '#282828',
    paddingBottom: 2,
    fontSize: 15,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#282828',
    paddingTop: 4,
  },
  checkoutBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E52221',
    backgroundColor: '#E52221',
    marginTop: 20,
    ...Platform.select({
      ios: {},
      android: {
        width: '100%',
        height: 50,
        marginTop: 5,
      },
      default: {},
    }),
  },
  checkoutText: {
    fontSize: 20,
  },
  cartItemsWrap: {
    padding: 20,
    marginBottom: 20,
  },
  cartItems: {
    height: 140,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  cartDelText: {
    marginTop: 25,
    fontSize: 13,
    color: '#777777',
    ...Platform.select({
      ios: {},
      android: {
        marginTop: 15,
      },
      default: {},
    }),
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    ...Platform.select({
      ios: {
        marginTop: 25,
        height: 30,
      },
      android: {},
      default: {},
    }),
  },
  closeIcon: {
    marginLeft: 25,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    fontSize: 20,
  },
});

export default styles;
