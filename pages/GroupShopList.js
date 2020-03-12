import React, {useState, useEffect, useRef} from 'react';
import {Alert, SafeAreaView, FlatList} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import FridgeItem from '../components/FridgeItem';
import Style from '../components/Style';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
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

const GroupShopList = props => {
  const [groupItems, setItems] = useState();
  const [dateState, setNewDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [markedItem, setMark] = useState();
  const refHolder = useRef(true);
  const [search, onChangeText] = useState('');

  useEffect(() => {
    storageService.getAllShop(search,true).then(itemList => setItems(itemList));
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
    storageService.submit(
      removedItem.name,
      removedItem.category,
      formattedDate(),
      removedItem.barcode,
      removedItem.quantity,
      removedItem.unit,
      false,
      true,
    );
    storageService.remove(removedItem.id, 'shopList', true);
    console.log('remove');
    refresh();
  };
  const refresh = (search) => {
    //force component rerender
    storageService.getAllShop(search,true).then(itemList => setItems(itemList));
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
        {text: 'Bought', onPress: () => initRemove(removedItem)},
        {text: "Don't want", onPress: () => {storageService.remove(removedItem.id, 'shopList',true), refresh();}},
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
        <Item>
          <Input placeholder="All items in group shopping list" value={search} onChangeText={name => {onChangeText(name); refresh(name);}}/>
          <Icon name="search" />
        </Item>
        <Button transparent onPress={() => refresh(search)}>
          <Text>Search</Text>
        </Button>
      </Header>
      <FlatList
        data={groupItems}
        renderItem={({item}) => (
          <TouchableNativeFeedback onPress={() => removeAlert(item)}>
            <FridgeItem name={item.name} category={item.category} />
          </TouchableNativeFeedback>
        )}
        keyExtractor={item => item.id}
      />
      {show && ( //translates to if show is true then do whatever is after &&
        <DateTimePicker
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
      <SubmitButton
        items={groupItems}
        refresh={() => refresh()}
        shopping={true}
        group={true}
      />
      <Footer>
        <FooterTab>
          <Button onPress={() => props.navigation.navigate('GroupFridge')}>
            <Icon active name="pizza" />
            <Text>Fridge</Text>
          </Button>
          <Button active>
            <Icon name="basket" />
            <Text>Shop list</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('GroupStatistics')}>
            <Icon name="pie" />
            <Text>Statistics</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default GroupShopList;
