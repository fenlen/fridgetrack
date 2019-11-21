import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import Item from '../components/Item';
import Style from '../components/Style';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';

const ShopList = () => {
  const [items, setItems] = useState();
  const [dateState, setNewDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [markedItem, setMark] = useState();
  const refHolder = useRef(true);
  useEffect(() => {
    storageService.getAllShop().then(itemList => setItems(itemList));
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
    storageService.submit(removedItem.name, removedItem.weight, removedItem.category, formattedDate(dateState));
    storageService.remove(removedItem.id);
    console.log('remove');
    refresh();
  };
  const refresh = () => {
        //force component rerender
        storageService.getAllShop().then(itemList => setItems(itemList));
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
              <Item name={item.name} expDate={''} />
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
