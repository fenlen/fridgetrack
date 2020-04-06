/**
 * @format
 */
/**
 * Entry point for the application. Serves as a wrapper for App.
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './pages/App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
