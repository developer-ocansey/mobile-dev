import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#FFFFFF',
  },
  userBtn: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E52221',
    backgroundColor: '#E52221',
    height: 50,
  },
  btnText: {
    fontSize: 20,
  },
  accountText: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    fontSize: 14,
    color: '#282828',
  },
  delDetails: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delDetailsText: {
    fontSize: 20,
    marginLeft: 25,
  },
  left: {
    flexDirection: 'row',
  },
});

export default styles;
