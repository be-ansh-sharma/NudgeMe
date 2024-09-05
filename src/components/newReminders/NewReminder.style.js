import { COLOR } from 'global/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    alignItems: 'center',
    marginTop: '20%',
  },
  title: {
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 30,
    color: COLOR.primary,
  },
  occurance: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  occuranceText: {
    fontSize: 25,
    borderBottomWidth: 1,
    borderColor: COLOR.primary,
    textTransform: 'capitalize',
  },
  selected: {
    borderBottomColor: COLOR.primary,
    borderBottomWidth: 1,
    color: COLOR.primary,
  },
  picker: {
    flexDirection: 'row',

    height: '7%',
  },
  dates: {
    flexDirection: 'row',
    //marginTop: '4%',
  },
  label: {
    marginTop: '10%',
    fontSize: 22,
  },
  inputmessage: {
    width: 200,
    height: 70,
  },
});
