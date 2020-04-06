import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import MealItem from '../components/MealItem';
import MealSubmitButton from '../components/MealSubmitButton';
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

const Meals = props => {
  const [items, setItems] = useState([]);
  const [search, onChangeText] = useState();

  useEffect(() => {
    //executes on initial component render
    storageService.getAllMeal(search).then(itemList => setItems(itemList));
  }, [search]);

  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      const rerender = storageService
        .getAllMeal()
        .then(itemList => setItems(itemList));

      return () => rerender;
    }, []),
  );

  const removeMeal = id => {
    //remove the item with the given id from the database
    storageService.removeMeal(id);
    refresh(search);
  };

  const refresh = search => {
    //force component rerender
    storageService.getAllMeal(search).then(itemList => setItems(itemList));
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
          <Input
            placeholder="All your meals"
            value={search}
            onChangeText={name => {
              onChangeText(name);
              refresh(name);
            }}
          />
          <Icon name="search" />
        </Item>
        <Button transparent onPress={() => refresh()}>
          <Text>Search</Text>
        </Button>
      </Header>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate('ViewMealModal', {item: item})
            }>
            <MealItem type={item.type} date={item.date} />
          </TouchableNativeFeedback>
        )}
        keyExtractor={item => item.id}
      />
      <MealSubmitButton items={items} refresh={() => refresh()} />
    </Container>
  );
};

export default Meals;
