import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import FridgeItem from '../components/FridgeItem';
import SubmitButton from '../components/SubmitButton';
import Style from '../components/Style';
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
  Input,
  Item,
  View,
  List,
} from 'native-base';

const Fridge = props => {
  const [items, setItems] = useState([]);
  // const [fridgeRef, setFridgeRef] = useState('test');
  const [search, onChangeText] = useState('');
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    //executes on initial component render
    if (auth().currentUser != null) {
      setLogged(true);
      storageService.getAll(search).then(itemList => setItems(itemList));
    }
    else
      storageService.getAllUnreg().then(itemList => setItems(itemList));
  }, []);

  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      var rerender;
      if(logged)
          rerender = storageService
            .getAll()
            .then(itemList => setItems(itemList));
      else
          rerender = storageService
            .getAllUnreg()
            .then(itemList => setItems(itemList));


      return () => rerender;
    }, []),
  );

  const refresh = (search) => {
    //force component rerender
    if(logged)
        storageService.getAll(search).then(itemList => setItems(itemList));
    else
        storageService.getAllUnreg().then(itemList => setItems(itemList));
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
        <Item searchBar>
          <Input placeholder="All items in your fridge" value={search} onChangeText={name => {onChangeText(name); refresh(name);}}/>
          <Icon name="search" />
        </Item>
        <Button transparent onPress={() => refresh()}>
          <Text>Search</Text>
        </Button>
        </>
        )}
        {!logged &&(
        <Body>
          <Title>Your Fridge</Title>
        </Body>
        )}
      </Header>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate('ViewItemModal', {item: item})
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
      <SubmitButton items={items} refresh={() => refresh()} shopping={false} />
      <Footer>
        <FooterTab>
          <Button active>
            <Icon active name="pizza" />
            <Text>Fridge</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('ShopList')}>
            <Icon name="basket" />
            <Text>Shop list</Text>
          </Button>
          {logged && (
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

export default Fridge;
