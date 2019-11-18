import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Item from '../components/Item';
import SubmitButton from '../components/SubmitButton';
import Style from '../components/Style';
import storageService from '../services/storage';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    //executes on initial component render
    storageService.getAll().then(itemList => setItems(itemList));
  }, []);

  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      const rerender = storageService
        .getAll()
        .then(itemList => setItems(itemList));

      return () => rerender;
    }, []),
  );

  const removeItem = id => {
    //remove the item with the given id from the database
    storageService.remove(id);
    refresh();
  };

  const refresh = () => {
    //force component rerender
    storageService.getAll().then(itemList => setItems(itemList));
  };

  return (
    <>
      <SafeAreaView style={Style.container}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <TouchableNativeFeedback onPress={() => removeItem(item.id)}>
              <Item content={item.content} expDate={item.expDate} />
            </TouchableNativeFeedback>
          )}
          keyExtractor={item => item.id}
        />
        <SubmitButton
          items={items}
          refresh={() => refresh()}
          shopping={false}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
