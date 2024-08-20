import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

const AppStore = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => AppStore);
