import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import FridgeItem from '../components/FridgeItem';
import SubmitButton from '../components/SubmitButton';
import Style from '../components/Style';
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
  Input,
  Item,
  View,
  List,
} from 'native-base';

const GroupFridge = props => {
  const [items, setItems] = useState([]);
  const [search, onChangeText] = useState('');

  useEffect(() => {
    //executes on initial component render
    storageService.getAll(search,true).then(itemList => setItems(itemList));
  }, []);

  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      const rerender = storageService
        .getAll(search,true)
        .then(itemList => setItems(itemList));

      return () => rerender;
    }, []),
  );

  const removeItem = id => {
    //remove the item with the given id from the database
    storageService.remove(id);
    refresh();
  };

  const refresh = (search) => {
    //force component rerender
    storageService.getAll(search,true).then(itemList => setItems(itemList));
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
          <Input placeholder="All items in group fridge" value={search} onChangeText={name => {onChangeText(name); refresh(name);}}/>
          <Icon name="search" />
        </Item>
        <Button transparent onPress={() => refresh(search)}>
          <Text>Search</Text>
        </Button>
      </Header>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate('GroupViewItemModal', {item: item})
            }>
            <FridgeItem
              name={item.name}
              expDate={item.expDate}
              category={item.category}
            />
          </TouchableNativeFeedback>
        )}
        keyExtractor={item => item.id}
      />
      <SubmitButton
        items={items}
        refresh={() => refresh()}
        shopping={false}
        group={true}
      />
      <Footer>
        <FooterTab>
          <Button active>
            <Icon active name="pizza" />
            <Text>Fridge</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('GroupShopList')}>
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

export default GroupFridge;
