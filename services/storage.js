import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

const getAll = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }

  const promisedItems = keys.map(async itemId => {
    const itemPromise = await get(itemId);
    return itemPromise;
  });
  const results = await Promise.all(promisedItems);
  return results.filter(item => item.isShop !== true);
};

const getAllShop = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }

  const promisedItems = keys.map(async itemId => {
    const itemPromise = await get(itemId);
    return itemPromise;
  });
  const results = await Promise.all(promisedItems);
  return results.filter(item => item.isShop === true);
};

const get = async key => {
  let item;
  try {
    item = await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('error: fetching item failed');
    throw e;
  }
  // console.log(typeof item, ' Hi');
  return JSON.parse(item);
};

const submit = async (name, category, expDate, barcode, quantity, unit, isShop = false) => {
  const newId = Date.now();
  const newItem = {
    id: newId.toString(),
    name: name,
    category: category,
    expDate: expDate,
    barcode: barcode,
    quantity: quantity,
    unit: unit,
    isShop: isShop,

  };
  try {
    await AsyncStorage.setItem(newId.toString(), JSON.stringify(newItem));
  } catch (e) {
    console.log('error: submitItem failed');
    throw e;
  }
};

const remove = async id => {
  try {
    await AsyncStorage.removeItem(id);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default {getAll, getAllShop, get, submit, remove};
