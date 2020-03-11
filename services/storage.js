import AsyncStorage from '@react-native-community/async-storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Global from '../state/global';

const user = () => firebase.auth().currentUser.uid;

const getAll = async () => {
  // let keys = [];
  let keys;
  try {
    // keys = await AsyncStorage.getAllKeys();
    keys = await firestore()
      .collection('fridges')
      .doc(user())
      .collection('itemList')
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }

  // const promisedItems = keys.map(async itemId => {
  //   const itemPromise = await get(itemId);
  //   return itemPromise;
  // });
  // const results = await Promise.all(promisedItems);
  // const results = keys.docs();
  // console.log('HI \n\n\n\n' + results);
  const results = keys.docs.map(item => item.data());
  // results = results.map(item => item.data());
  return results.filter(item => item.isShop !== true);
};

const getAllShop = async () => {
  let keys;
  try {
    // keys = await AsyncStorage.getAllKeys();
    keys = await firestore()
      .collection('fridges')
      .doc(user())
      .collection('shopList')
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }

  // const promisedItems = keys.map(async itemId => {
  //   const itemPromise = await get(itemId);
  //   return itemPromise;
  // });
  // const results = await Promise.all(promisedItems);
  return keys.docs.map(item => item.data());
};

const get = async (key, targetList) => {
  let item;
  try {
    // item = await AsyncStorage.getItem(key);
    item = await firestore()
      .collection('fridges')
      .doc(user())
      .collection(targetList)
      .doc(key);
  } catch (e) {
    console.log('error: fetching item failed');
    throw e;
  }
  // console.log(typeof item, ' Hi');
  return JSON.parse(item);
};

const submit = async (
  name,
  category,
  expDate,
  barcode,
  quantity,
  unit,
  isShop = false,
) => {
  const newId = Date.now();
  const newItem = {
    id: newId.toString(),
    name: name,
    category: category,
    expDate: expDate,
    barcode: barcode,
    quantity: quantity,
    unit: unit,
  };
  let targetList;
  if (isShop === true) {
    targetList = 'shopList';
  } else {
    targetList = 'itemList';
  }
  try {
    // await AsyncStorage.setItem(newId.toString(), JSON.stringify(newItem));
    // console.log(Global.user, Global.user.userId, firebase.auth().currentUser.uid);
    await firestore()
      .collection('fridges')
      .doc(user())
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitItem failed');
    throw e;
  }
};

const remove = async (id, targetList) => {
  try {
    // await AsyncStorage.removeItem(id);
    console.log(Global.fridge, targetList);
    await firestore()
      .collection('fridges')
      .doc(user())
      .collection(targetList)
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default {getAll, getAllShop, get, submit, remove};
