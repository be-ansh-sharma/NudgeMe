import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

const AppStore = () => (
  <Provider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppStore);
