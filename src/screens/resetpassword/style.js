import { StyleSheet, Platform } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  editDetailsWrap: {
    padding: 20,
    marginTop: 20,
  },
  editDetails: {
    marginBottom: 30,
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#282828',
    fontSize: 20,
    paddingLeft: 20,
  },
  text_footer: {
    fontSize: 14,
    color: '#777777',
  },
  userBtn: {
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
  btnText: {
    fontSize: 20,
  },
});
