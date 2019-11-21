/**
 * @format
 * @flow
 */

import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddItemModal from './pages/AddItemModal';
import Fridge from './pages/Main';
import ShopList from './pages/ShopList';

const App: () => React$Node = () => {
  return <Fridge />; //render the Home screen
};

const drawerStack = createDrawerNavigator(
  //Drawer navigation menu
  {
    Fridge: App,
    ShopList,
  },
  {
    navigationOptions: ({navigation}) => ({
      //defines the header bar and the 'hamburger' button for opening the menu
      headerStyle: {backgroundColor: 'lightskyblue'},
      title: 'Fridge App',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image source={require('./hamicon.png')} resizeMode="contain" />
        </TouchableOpacity>
      ),
    }),
  },
);

const navigator = createStackNavigator(
  //contains the drawer navigation as a stack, in order for rootstack to work
  {
    drawerStack: {screen: drawerStack},
  },
  {
    initialRouteName: 'drawerStack',
  },
);

const RootStack = createStackNavigator(
  //the root 'stack' of react-navigation, handles transition between modal and the main screens
  {
    Main: {
      screen: navigator,
    },
    MyModal: {
      screen: AddItemModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
