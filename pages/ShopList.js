import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {submitItem} from './Main';
import SubmitButton from '../components/SubmitButton';
import Item from '../components/Item';
import Style from '../components/Style';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

var shopList = [{id: '1', content: 'Ham', expDate: ''}]; //these two variables serve as a storage throughout the app, aka a 'database'

const submitShopItem = content => {
  console.log('hi');
  const newId = (shopList.length + 1).toString();
  const newItem = {
    id: newId,
    content: content,
  };
  shopList = [...shopList, newItem];
};

const ShopList = () => {
  const [items, setItems] = useState(shopList);
  const [dateState, setNewDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [markedItem, setMark] = useState();
  const refHolder = useRef(true);
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
    //just returns the date in a dd/mm/yy format
    return (
      dateState.getDate() +
      '/' +
      (dateState.getMonth() + 1) +
      '/' +
      (dateState.getFullYear() - 2000)
    );
  };
  const removeItem = removedItem => {
    //first adds the item into itemList and then removes it from shopList
    submitItem(removedItem.content, formattedDate(dateState));
    shopList = shopList.filter(item => item.id !== removedItem.id);
    refresh();
  };
  const refresh = () => {
    //force component rerender
    setItems(shopList);
  };
  const setDate = (event, date) => {
    //handler for the onChange function of DateTimePicker
    // date = date || dateState;
    setShow(false);
    setNewDate(date);
    refHolder.current = dateState;
  };
  return (
    <>
      <SafeAreaView style={Style.container}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <TouchableNativeFeedback onPress={() => initRemove(item)}>
              <Item content={item.content} expDate={item.expDate} />
            </TouchableNativeFeedback>
          )}
          keyExtractor={item => item.id}
        />
        <SubmitButton items={items} refresh={() => refresh()} shopping={true} />
        {show && ( //translates to if show is true then do whatever is after &&
          <DateTimePicker
            value={dateState}
            mode={mode}
            display="default"
            onChange={(event, date) => setDate(event, date)}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default ShopList;
export {submitShopItem};
