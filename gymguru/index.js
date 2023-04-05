import { registerRootComponent } from 'expo';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import App from './App';

Amplify.configure(config);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
