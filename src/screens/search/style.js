import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    color: '#05375a',
    borderWidth: 1,
    height: 40,
    borderColor: '#ebebeb',
    marginBottom:0,
    padding: 10,
    width: '80%'
  },
  searchHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    margin: 10
  },
  searcResult: {
    margin:10
  },
  searchBtn: {
    color: 'white',
    backgroundColor: '#E52221',
    width: '15%',
    marginRight: 20,
    borderRadius: 0,
  },
  search_: {
    padding: 10,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
  } 
});

export default styles;
