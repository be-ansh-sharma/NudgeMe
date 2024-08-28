import { COLOR } from 'global/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.background,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10, // Required for Android
    width: '95%',
    height: 100,
    marginTop: 10,
    flexDirection: 'row',
  },
  content: {
    width: '92%',
  },
  icon: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});
