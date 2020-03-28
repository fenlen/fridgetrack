/**
 * @format
 * @flow
 */

import React from 'react';
import {Image, Dimensions} from 'react-native';
import {Root, StyleProvider, View} from 'native-base';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Fridge from './Fridge.js';
import ShopList from './ShopList.js';
import Barcode from './Scan.js';
import Statistics from './Statistics.js';
import Home from './Home/Home.js';
import SideBar from './sidebar';
import AddItemModal from './AddItemModal.js';
import Account from './Account.js';
import getTheme from '../native-base-theme/components';
import {material} from '../components/material';
import AppearanceModal from './AppearanceModal.js';
import NotificationsModal from './NotificationsModal.js';
import ViewItemModal from './ViewItemModal.js';
import GroupFridge from './GroupFridge';
import GroupShopList from './GroupShopList';
import GroupStatistics from './GroupStatistics';
import GroupAddItemModal from './GroupAddItemModal';
import GroupViewItemModal from './GroupViewItemModal';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import GroupModal from './GroupModal';
import Recipes from './Recipes';
import AddRecipeModal from './AddRecipeModal';
import ViewRecipeModal from './ViewRecipeModal';
import Meals from './Meals';
import AddMealModal from './AddMealModal';
import ViewMealModal from './ViewMealModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import auth from '@react-native-firebase/auth';
import storageService from '../services/storage';
import Global from '../state/global.js';
import Logo from '../logo/logo.png';

class Theme extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    if (auth().currentUser !== null) {
      let data = {};
      await storageService.getUserData().then(dataList => (data = dataList));
      Global.colour = data['colour'];
      Global.size = data['size'];
      Global.font = data['font'];
      await storageService.getFridgeData(data['groupFridge']).then(fridge =>(Global.groupFridge = fridge));
    }
    this.setState({loaded: true});
  }

  render() {
    if (this.state.loaded)
      return (
        <StyleProvider style={getTheme(material())}>
          <Root>
            <AppContainer />
          </Root>
        </StyleProvider>
      );

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Image
          style={{width: '70%', height: Dimensions.get('window').width * 0.7}}
          source={Logo}
        />
      </View>
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
    GroupFridge,
    GroupShopList,
    GroupStatistics,
    Barcode,
    Account,
    Recipes,
    Meals,
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: props => <SideBar {...props} />,
  },
);

const AppNavigator = createStackNavigator(
  //contains the drawer navigation as a stack, in order for rootstack to work
  {
    Drawer: {screen: Drawer},
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
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
    GroupItemModal: {
      screen: GroupAddItemModal,
    },
    ViewItemModal: {
      screen: ViewItemModal,
    },
    GroupViewItemModal: {
      screen: GroupViewItemModal,
    },
    AppearanceModal: {
      screen: AppearanceModal,
    },
    NotificationsModal: {
      screen: NotificationsModal,
    },
    RegisterModal: {
      screen: RegisterModal,
    },
    LoginModal: {
      screen: LoginModal,
    },
    GroupModal: {
      screen: GroupModal,
    },
    AddRecipeModal: {
      screen: AddRecipeModal,
    },
    ViewRecipeModal: {
      screen: ViewRecipeModal,
    },
    AddMealModal: {
      screen: AddMealModal,
    },
    ViewMealModal: {
      screen: ViewMealModal,
    },
    UpdatePasswordModal: {
      screen: UpdatePasswordModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default Theme;
