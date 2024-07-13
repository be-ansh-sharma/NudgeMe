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
  picker: {
    flexDirection: 'row',
    marginTop: '10%',
    height: '7%',
  },
  label: {
    marginTop: '10%',
    fontSize: 22,
  },
});
