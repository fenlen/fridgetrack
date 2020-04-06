import AsyncStorage from '@react-native-community/async-storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Global from '../state/global';
import NotifService from './NotifService';

const notif = new NotifService();

const fridge = async group => {
  let fridgeRef;
  const userId = firebase.auth().currentUser.uid;

  if (group) {
    const getCode = async () => {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then(snapshot => (fridgeRef = snapshot.get('groupFridge')));
    };
    await getCode();
  } else {
    fridgeRef = userId;
  }
  return fridgeRef;
};

const getAll = async (search = '', group = false) => {
  let keys;
  try {
    keys = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection('itemList')
      .orderBy('name')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed here');
    throw e;
  }
  const results = keys.docs.map(item => item.data());
  return results.filter(item => item.isShop !== true);
};

const deleteAll = async (search = '', group = false) => {
  let keys;
  try {
    keys = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .delete();
  } catch (e) {
    console.log('error: deleting all keys failed here');
    throw e;
  }
};

const getAllShop = async (search = '', group = false) => {
  let keys;
  try {
    keys = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection('shopList')
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }
  return keys.docs.map(item => item.data());
};

const deleteAllShop = async (search = '', group = false) => {
  let keys;
  try {
    keys = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .delete();
  } catch (e) {
    console.log('error: deleting all keys failed');
    throw e;
  }
};

const get = async (key, targetList, group = false) => {
  let item;
  try {
    item = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(key);
  } catch (e) {
    console.log('error: fetching item failed');
    throw e;
  }
  return JSON.parse(item);
};

const submit = async (
  name,
  category,
  expDate,
  quantity,
  unit,
  isShop = false,
  group = false,
) => {
  const newId = Date.now();
  const newItem = {
    id: newId.toString(),
    name: name,
    category: category,
    expDate: expDate,
    quantity: parseInt(quantity).toString(),
    unit: unit,
  };
  let targetList;
  if (isShop === true) {
    targetList = 'shopList';
  } else {
    targetList = 'itemList';
    if (group) {
      notif.scheduleGroupNotif(newId, expDate, name);
    } else {
      notif.scheduleNotif(newId, expDate, name);
    }
  }
  try {
    await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitItem failed');
    throw e;
  }
};

const remove = async (id, targetList, group = false) => {
  try {
    await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const update = async (id, quantity, targetList, group = false) => {
  try {
    await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(id)
      .update({quantity: quantity});
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//Recipes

const submitRecipe = async (name, level, duration, ingredients, method) => {
  const newId = Date.now();
  const userId = firebase.auth().currentUser.uid;
  const newItem = {
    id: newId.toString(),
    name: name,
    level: level,
    duration: duration,
    ingredients: [],
    method: method,
    favorite: false,
  };
  for (const i in ingredients) {
    newItem.ingredients.push(ingredients[i]);
  }

  let targetList = 'recipeList';
  try {
    await firestore()
      .collection('recipes')
      .doc(userId)
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitRecipe failed');
    throw e;
  }
};

const removeRecipe = async id => {
  const userId = firebase.auth().currentUser.uid;
  try {
    await firestore()
      .collection('recipes')
      .doc(userId)
      .collection('recipeList')
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getAllRecipe = async (search = '') => {
  const userId = firebase.auth().currentUser.uid;
  let keys;
  try {
    keys = await firestore()
      .collection('recipes')
      .doc(userId)
      .collection('recipeList')
      .orderBy('name')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed' + e);
    throw e;
  }
  const results = keys.docs.map(item => item.data());
  return results;
};

const deleteAllRecipe = async (search = '') => {
  const userId = firebase.auth().currentUser.uid;
  let keys;
  try {
    keys = await firestore()
      .collection('recipes')
      .doc(userId)
      .delete();
  } catch (e) {
    console.log('error: deleting all keys failed' + e);
    throw e;
  }
};

const toggleFavorite = async (id, favorite) => {
  const userId = firebase.auth().currentUser.uid;
  try {
    await firestore()
      .collection('recipes')
      .doc(userId)
      .collection('recipeList')
      .doc(id)
      .update({favorite: !favorite});
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//Meals

const submitMeal = async (type, date, recipe) => {
  const newId = Date.now();
  const userId = firebase.auth().currentUser.uid;
  const newItem = {
    id: newId.toString(),
    type: type,
    date: date,
    recipe: recipe,
  };
  let targetList = 'mealList';
  try {
    await firestore()
      .collection('meals')
      .doc(userId)
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitMeal failed');
    throw e;
  }
};

const removeMeal = async id => {
  const userId = firebase.auth().currentUser.uid;
  try {
    await firestore()
      .collection('meals')
      .doc(userId)
      .collection('mealList')
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getAllMeal = async (search = '') => {
  const userId = firebase.auth().currentUser.uid;
  let keys;
  try {
    keys = await firestore()
      .collection('meals')
      .doc(userId)
      .collection('mealList')
      .orderBy('type')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed' + e);
    throw e;
  }
  const results = keys.docs.map(item => item.data());
  return results;
};

const deleteAllMeal = async (search = '') => {
  const userId = firebase.auth().currentUser.uid;
  let keys;
  try {
    keys = await firestore()
      .collection('meals')
      .doc(userId)
      .delete();
  } catch (e) {
    console.log('error: deleting all keys failed' + e);
    throw e;
  }
};

//Discarted/Eaten

const submitEaten = async (name, quantity, eaten, group) => {
  const newId = Date.now();
  const userId = firebase.auth().currentUser.uid;
  const newItem = {
    id: newId.toString(),
    name: name,
    quantity: quantity,
    eaten: eaten,
    group: group,
  };
  let targetList = 'discList';
  try {
    await firestore()
      .collection('disc')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitMeal failed');
    throw e;
  }
};

const getAllEaten = async (group = false) => {
  let keys;
  let idCheck = new Date();
  idCheck.setMonth(idCheck.getMonth() - 1);
  console.log(idCheck.getTime());
  const userId = firebase.auth().currentUser.uid;
  try {
    keys = await firestore()
      .collection('disc')
      .doc(await fridge(group))
      .collection('discList')
      .where('id', '>', idCheck.getTime().toString())
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed' + e);
    throw e;
  }
  const results = keys.docs.map(item => item.data());
  return results;
};

//UserData

const getUserData = async () => {
  let result;
  const userId = firebase.auth().currentUser.uid;
  try {
    result = await firestore()
      .doc(`users/${userId}`)
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed' + e);
    throw e;
  }
  return result;
};

//unregistered user

const getAllUnreg = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('error: UNREG retrieving all keys failed');
    throw e;
  }

  const promisedItems = keys.map(async itemId => {
    const itemPromise = await getUnreg(itemId);
    return itemPromise;
  });
  const results = await Promise.all(promisedItems);
  return results.filter(item => item.isShop !== true);
};

const getAllShopUnreg = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }

  const promisedItems = keys.map(async itemId => {
    const itemPromise = await getUnreg(itemId);
    return itemPromise;
  });
  const results = await Promise.all(promisedItems);
  return results.filter(item => item.isShop === true);
};

const getUnreg = async key => {
  let item;
  try {
    item = await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('error: fetching item failed');
    throw e;
  }
  return JSON.parse(item);
};

const submitUnreg = async (
  name,
  category,
  expDate,
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

const removeUnreg = async id => {
  try {
    await AsyncStorage.removeItem(id);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//Barcode list

const getBarcode = async key => {
  let item;
  try {
    item = await firestore()
      .collection('barcodes')
      .doc(key)
      .get();
  } catch (e) {
    console.log('error: fetching barcode failed');
    throw e;
  }
  return item.data();
};

const updateBarcode = async (name, category, barcode, quantity, unit) => {
  let item;
  try {
    item = await firestore()
      .collection('barcodes')
      .doc(key)
      .get();
  } catch (e) {
    console.log('error: fetching barcode failed');
    throw e;
  }
  return item.data();
};

const submitBarcode = async (name, category, barcode, quantity, unit) => {
  const newItem = {
    id: barcode,
    name: name,
    category: category,
    quantity: quantity,
    unit: unit,
  };
  try {
    await firestore()
      .collection('barcodes')
      .doc(barcode)
      .set(newItem);
  } catch (e) {
    console.log('error: submitBarcode failed');
    throw e;
  }
};

//get fridge info

const getFridgeData = async key => {
  let item;
  try {
    item = await firestore()
      .collection('fridges')
      .doc(key)
      .get();
  } catch (e) {
    console.log('error: fetching fridge failed');
    throw e;
  }
  return item.data();
};

export default {
  fridge,
  getAll,
  deleteAll,
  getAllShop,
  deleteAllShop,
  get,
  submit,
  remove,
  update,
  submitRecipe,
  removeRecipe,
  getAllRecipe,
  deleteAllRecipe,
  toggleFavorite,
  submitMeal,
  removeMeal,
  getAllMeal,
  deleteAllMeal,
  submitEaten,
  getAllEaten,
  getUserData,
  getAllUnreg,
  getAllShopUnreg,
  submitUnreg,
  removeUnreg,
  getUnreg,
  submitBarcode,
  getBarcode,
  getFridgeData,
};
