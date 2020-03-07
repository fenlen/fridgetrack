/**
 * @format
 * @flow
 */

import React from 'react';
import { Root, StyleProvider } from "native-base";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Fridge from "./Fridge.js";
import ShopList from "./ShopList.js";
import Barcode from "./Scan.js";
import Statistics from "./Statistics.js";
import Home from "./Home/Home.js";
import SideBar from "./sidebar";
import AddItemModal from "./AddItemModal.js";
import Account from "./Account.js";
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import materialRed from '../native-base-theme/variables/materialRed';
import platform from '../native-base-theme/variables/platform';
import platformFeather from '../native-base-theme/variables/platformFeather';
import Global from "../state/global.js";
import AppearanceModal from "./AppearanceModal.js";
import NotificationsModal from "./NotificationsModal.js";
import ViewItemModal from "./ViewItemModal.js";

class Theme extends React.Component {

  render() {
  if(Global.colour == "Blue")
        return(
            <StyleProvider style={getTheme(material)}>
                <Root>
                    <AppContainer />
                </Root>
            </StyleProvider>
        );
    else
       return(
                   <StyleProvider style={getTheme(materialRed)}>
                       <Root>
                           <AppContainer />
                       </Root>
                   </StyleProvider>
               );
}
}

const Drawer = createDrawerNavigator(
  //Drawer navigation menu
  {
    Theme,
    Home,
    Fridge,
    ShopList,
    Statistics,
    Barcode,
    Account,
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  //contains the drawer navigation as a stack, in order for rootstack to work
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  //the root 'stack' of react-navigation, handles transition between modal and the main screens
  {
    Main: {
      screen: AppNavigator,
    },
    ItemModal: {
      screen: AddItemModal,
    },
    ViewItemModal: {
      screen: ViewItemModal,
    },
    AppearanceModal: {
      screen: AppearanceModal,
    },
    NotificationsModal: {
      screen: NotificationsModal,
    },

  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);


export default Theme