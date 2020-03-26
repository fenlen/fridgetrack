import React, {useState, useEffect, useRef} from 'react';
import {Alert, SafeAreaView, FlatList} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import FridgeItem from '../components/FridgeItem';
import Style from '../components/Style';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Item,
  View,
  Input,
} from 'native-base';
import Global from '../state/global';

const ShopList = props => {
  const [items, setItems] = useState();
  const [dateState, setNewDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [markedItem, setMark] = useState();
  // const [fridgeRef, setFridgeRef] = useState('test');
  const refHolder = useRef(true);
  const [search, onChangeText] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    //executes on initial component render
    if (auth().currentUser != null) {
      setLogged(true);
      storageService.getAllShop(search).then(itemList => setItems(itemList));
    }
    else
      storageService.getAllShopUnreg().then(itemList => setItems(itemList));
  }, []);

  useEffect(() => {
    //watches for a change in dateState and then removes the selected item, except during the initial render of the component
    if (refHolder.current === true) {
      //this part ensures removeItem() isn't called during initial render
      refHolder.current = false;
    } else {
      removeItem(markedItem);
    }
  }, [dateState]); // eslint-disable-line react-hooks/exhaustive-deps

  const initRemove = item => {
    //called when an item is pressed, 'marks' the item for removal and then shows the date picker
    setMark(item);
    setShow(true);
  };
  const formattedDate = () => {
    return (
      ('0' + dateState.getDate()).slice(-2) +
      '/' +
      ('0' + (dateState.getMonth() + 1)).slice(-2) +
      '/' +
      (dateState.getFullYear() - 2000)
    );
  };
  const removeItem = removedItem => {
    //first adds the item into itemList and then removes it from shopList
    if (logged)
        {storageService.submit(
          removedItem.name,
          removedItem.category,
          formattedDate(),
          removedItem.barcode,
          removedItem.quantity,
          removedItem.unit,
        );
        storageService.remove(removedItem.id, 'shopList');}
    else
        {storageService.submitUnreg(
          removedItem.name,
          removedItem.category,
          formattedDate(),
          removedItem.quantity,
          removedItem.unit,
        );
        storageService.removeUnreg(removedItem.id);}
    refresh();
  };
  const refresh = (search) => {
    //force component rerender
    if (logged)
        storageService.getAllShop(search).then(itemList => setItems(itemList));
    else
        storageService.getAllShopUnreg().then(itemList => setItems(itemList));

  };
  const setDate = (event, date) => {
    //handler for the onChange function of DateTimePicker
    // date = date || dateState;
    setShow(false);
    setNewDate(date);
    refHolder.current = dateState;
  };

  const removeAlert = removedItem => {
    Alert.alert(
      'Remove item from shopping list',
      'What happened to this item?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Bought', onPress: () => infoAlert(removedItem)},
        {text: "Don't want", onPress: () => {if(logged) storageService.remove(removedItem.id, 'shopList'); else storageService.removeUnreg(removedItem.id); refresh();}},
      ],
      {cancelable: false},
    );
  };


  const infoAlert = removedItem => {
    Alert.alert(
      'Info screen',
      'Next you will be prompted to pick an expiration date for your item.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Ok', onPress: () => initRemove(removedItem)},
      ],
      {cancelable: false},
    );
  };

  return (
    <Container style={Style.container}>
      <Header searchBar>
        <Left style={{flex: 0, width: 50}}>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        {logged && (
        <>
        <Item>
          <Input placeholder="All items in your shopping list" value={search} onChangeText={name => {onChangeText(name); refresh(name);}}/>
          <Icon name="search" />
        </Item>
        <Button transparent onPress={() => refresh(search)}>
          <Text>Search</Text>
        </Button>
        </>
        )}
        {!logged &&(
        <Body>
          <Title>Your shopping list</Title>
        </Body>
        )}
      </Header>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableNativeFeedback onPress={() => removeAlert(item)}>
            <FridgeItem name={item.name} category={item.category} />
          </TouchableNativeFeedback>
        )}
        keyExtractor={item => item.id}
      />
      {show && ( //translates to if show is true then do whatever is after &&
        <DateTimePicker
          title='Please pick an expiration date'
          value={dateState}
          minimumDate={dateState}
          maximumDate={
            new Date(
              dateState.getFullYear() + 1,
              dateState.getMonth(),
              dateState.getDate(),
            )
          }
          mode={mode}
          display="default"
          onChange={(event, date) => setDate(event, date)}
        />
      )}
      <SubmitButton items={items} refresh={() => refresh()} shopping={true} />
      <Footer>
        <FooterTab>
          <Button onPress={() => props.navigation.navigate('Fridge')}>
            <Icon active name="pizza" />
            <Text>Fridge</Text>
          </Button>
          <Button active>
            <Icon name="basket" />
            <Text>Shop list</Text>
          </Button>
          {logged &&(
          <Button onPress={() => props.navigation.navigate('Statistics')}>
            <Icon name="pie" />
            <Text>Statistics</Text>
          </Button>
          )}
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ShopList;
