import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E52221',
  },
  body: {
    flex: 3,
    backgroundColor: '#f9f9f9',
  },
  HeaderText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    ...Platform.select({
      ios: {
        paddingTop: 30,
      },
      android: {},
      default: {},
    }),
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
  orderItemsWrap: {
    padding: 20,
  },
  orderItems: {
    height: 100,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  orderNumber: {
    fontSize: 20,
  },
  orderDetails: {
    fontSize: 15,
    color: '#777777',
    paddingTop: 5,
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
