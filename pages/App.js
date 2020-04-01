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
import DeleteModal from './DeleteAccountModal';
import UpdateDetailsModal from './UpdateDetailsModal';
import Premium from './Premium';
import auth from '@react-native-firebase/auth';
import storageService from '../services/storage';
import Global from '../state/global.js';
import Logo from '../logo/logo.png';
import NotifService from '../services/NotifService';

class Theme extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
    this.notif = new NotifService();
  }

  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    if (auth().currentUser !== null) {
      let data = {};
      await storageService.getUserData().then(dataList => (data = dataList));
      Global.colour = data._data['colour'];
      Global.size = data._data['size'];
      Global.font = data._data['font'];
      Global.enableNotiication1 = data._data['enableNotification1'];
      Global.enableNotiication2 = data._data['enableNotification2'];
      Global.enableNotiication3 = data._data['enableNotification3'];
      Global.enableNotiication4 = data._data['enableNotification4'];
      if (!data._data['groupFridge']=='')
          await storageService
            .getFridgeData(data._data['groupFridge'])
            .then(fridge => (Global.groupFridge = fridge));
      this.updateNotifications();
    }

    this.setState({loaded: true});
  }

  async updateNotifications() {
    const items = await storageService.getAll();
    const groupItems = await storageService.getAll('', true);
    this.notif.cancelAll();
    for (const i in items) {
      this.notif.scheduleNotif(
        parseInt(items[i].id),
        items[i].expDate,
        items[i].name,
      );
    }
    for (const i in groupItems) {
      this.notif.scheduleGroupNotif(
        parseInt(groupItems[i].id),
        groupItems[i].expDate,
        groupItems[i].name,
      );
    }
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
    DeleteModal: {
      screen: DeleteModal,
    },
    UpdateDetailsModal: {
      screen: UpdateDetailsModal,
    },
    Premium: {
      screen: Premium,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default Theme;
