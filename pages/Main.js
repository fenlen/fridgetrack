import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Item from '../components/Item';
import SubmitButton from '../components/SubmitButton';
import Style from '../components/Style';
import ShopList from './ShopList';

var itemList = [
  {id: '1', content: 'Milk', expDate: '15/11/19'},
  {id: '2', content: 'Eggs', expDate: '19/11/19'},
];

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    //set the items state to contents of itemList on initial component render
    setItems(itemList);
  }, []);

  const removeItem = id => {
    //remove the item with the given id from the 'database'
    itemList = itemList.filter(item => item.id !== id);
    refresh();
  };

  const refresh = () => {
    //force component rerender
    setItems(itemList);
  };

  const renderList = useCallback(() => {
    setItems(itemList);
  }, [itemList]); // eslint-disable-line react-hooks/exhaustive-deps

  useFocusEffect(renderList); //forces component rerender if there has been a change in the 'database' from outside the component, i.e. from ShopList
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

const submitItem = (content, expDate) => {
  const newId = (itemList.length + 1).toString();
  const newItem = {
    id: newId,
    content: content,
    expDate: expDate,
  };
  itemList = [...itemList, newItem];
};

export {Home, ShopList, submitItem};
