/** Recipes screen for the user */
import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import RecipeItem from '../components/RecipeItem';
import RecipeSubmitButton from '../components/RecipeSubmitButton';
import Style from '../components/Style';
import storageService from '../services/storage';
import {
  Container,
  Header,
  Text,
  Button,
  Icon,
  Left,
  Input,
  Item,
} from 'native-base';

const Recipes = props => {
  const [items, setItems] = useState([]);
  const [search, onChangeText] = useState();

  useEffect(() => {
    //executes on initial component render
    storageService.getAllRecipe(search).then(itemList => setItems(itemList));
  }, [search]);

  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      const rerender = storageService
        .getAllRecipe()
        .then(itemList => setItems(itemList));

      return () => rerender;
    }, []),
  );

  const refresh = search => {
    //force component rerender
    storageService.getAllRecipe(search).then(itemList => setItems(itemList));
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
            placeholder="All your recipes"
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
              props.navigation.navigate('ViewRecipeModal', {item: item})
            }>
            <RecipeItem
              name={item.name}
              duration={item.duration}
              level={item.level}
              favorite={item.favorite}
            />
          </TouchableNativeFeedback>
        )}
        keyExtractor={item => item.id}
      />
      <RecipeSubmitButton items={items} refresh={() => refresh()} />
    </Container>
  );
};

export default Recipes;
