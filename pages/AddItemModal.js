// /* eslint-disable no-undef */
import React, {useState} from 'react';
import {Text, Button, Picker} from 'react-native';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import { TextInput } from 'react-native';


const AddItemModal = props => {
  const [pickerItems, setPicker] = useState('Diary'); //initial state for the Picker
  const [dateState, setNewDate] = useState(new Date()); //set date to current date
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('date'); //mode of the date picker
  const [show, setShow] = useState(false); //determines whether to show the date picker
  const [name, onChangeText] = React.useState('');

  const params = props.navigation.state.params;

  const submit = (name, weight, category, expDate) => {
    if (params.shopping) {
      storageService.submit(name, weight, category, expDate, true);
    } else {
      storageService.submit(name, weight, category, expDate);
    }
    params.refresh();
    goBack();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const setDate = (event, date) => {
    console.log(date);
    date = date || dateState;
    setShow(false);
    setNewDate(date);
  };

  const formattedDate = () => {
    return (
      dateState.getDate() +
      '/' +
      (dateState.getMonth() + 1) +
      '/' +
      (dateState.getFullYear() - 2000)
    );
  };

  return (
    <>
      <TextInput
            placeholder="Item name"
            onChangeText={name => onChangeText(name)}
            value={name}
         />
      <Picker
        selectedValue={pickerItems}
        onValueChange={itemValue => setPicker(itemValue)}>
        <Picker.Item label="Diary" value="Diary" />
        <Picker.Item label="Vegetable" value="Vegetable" />
        <Picker.Item label="Fruit" value="Fruit" />
        <Picker.Item label="Grain" value="Grain" />
        <Picker.Item label="Meat" value="Meat" />
      </Picker>
      {!params.shopping && ( //translates to if params.shopping is false do the part after &&
        <Button
          title="Choose expiration date"
          onPress={() => showDatePicker()}
        />
      )}
      {!params.shopping && (
        <Text style={Style.date}>
          Expires on:
          {formattedDate()}
        </Text>
      )}
      {show && (
        <DateTimePicker
          value={dateState}
          mode={mode}
          display="default"
          onChange={(event, date) => setDate(event, date)}
        />
      )}
      <Button
        title="Add item"
        onPress={() => submit(name, "300", pickerItems, formattedDate())}
      />

      <Button title="Back" onPress={() => goBack()} />
    </>
  );
};

export default AddItemModal;
